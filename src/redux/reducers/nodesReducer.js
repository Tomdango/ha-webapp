import { combineReducers } from 'redux';
import * as types from '../types/nodeTypes';

const initialAreasState = {
  requestStatus: 'idle',
  data: [],
};

const initialCoreState = {
  latestVersion: '2.0.0',
  activeNode: {
    id: '',
    data: {},
    loading: false,
  },
};

const initialDiscoveryState = {
  uninitializedNodes: [],
};

const initialSetupState = {
  setupActive: false,
  setupNodeId: '',
  currentSetup: {},
};

const coreReducer = (state = initialCoreState, action) => {
  switch (action.type) {
    case types.NODE_INFO_DIRECT_LOAD:
      return {
        ...state,
        activeNode: {
          ...state.activeNode,
          id: action.payload,

          loading: true,
        },
      };
    case types.NODE_INFO_FETCHED:
      return {
        ...state,
        activeNode: {
          ...state.activeNode,
          data: action.payload,
          name: action.payload.name,
          loading: false,
        },
      };
    case types.SET_ACTIVE_NODE:
      return {
        ...state,
        activeNode: { ...state.activeNode, ...action.payload },
      };
    case types.FETCHING_NODE_INFO:
      return { ...state, activeNode: { ...state.activeNode, loading: true } };
    case types.CLEAR_ACTIVE_NODE:
      return { ...state, activeNode: { id: '', data: {}, loading: false } };
    default:
      return state;
  }
};

const areasReducer = (state = initialAreasState, action) => {
  switch (action.type) {
    case types.FETCHING_AREA_DATA:
      return { ...state, requestStatus: 'fetching' };
    case types.AREA_DATA_FETCHED:
      return { ...state, requestStatus: 'idle', data: action.payload };
    default:
      return state;
  }
};

const discoveryReducer = (state = initialDiscoveryState, action) => {
  switch (action.type) {
    case types.DISCOVERED_NEW_NODE:
      return {
        ...state,
        uninitializedNodes: [...state.uninitializedNodes, ...action.payload],
      };
    case types.NODE_SETUP_SUCCESS: {
      const { node } = action.payload;
      return {
        ...state,
        uninitializedNodes: state.uninitializedNodes.filter(
          n => n.nodeId !== node.nodeId,
        ),
      };
    }
    default:
      return state;
  }
};

const setupReducer = (state = initialSetupState, action) => {
  switch (action.type) {
    case types.START_NODE_SETUP:
      if (action.payload === state.setupNodeId) {
        return { ...state, setupActive: true };
      }
      return {
        ...state,
        setupActive: true,
        setupNodeId: action.payload,
        currentSetup: {},
      };
    case types.CLOSE_NODE_SETUP:
      return { ...state, setupActive: false };
    case types.CANCEL_NODE_SETUP:
      return initialSetupState;
    default:
      return state;
  }
};

const initialDataState = {
  nodes: [],
  nodesLoaded: false,
};

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case types.NODE_DATA_FETCHED:
      return { ...state, nodes: action.payload, nodesLoaded: true };
    default:
      return state;
  }
};
export default combineReducers({
  areas: areasReducer,
  core: coreReducer,
  discovery: discoveryReducer,
  setup: setupReducer,
  data: dataReducer,
});
