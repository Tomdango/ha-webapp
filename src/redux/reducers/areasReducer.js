import { combineReducers } from 'redux';
import * as types from '../types/areaTypes';
import * as datafeed from '../types/datafeedTypes';

const initialDataState = {
  requestStatus: 'idle',
  areasFetched: false,
  areas: [],
  areasNotFound: [],
};

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case types.FETCHING_AREA_DATA:
      return { ...state, requestStatus: 'fetching' };
    case types.AREA_DATA_FETCHED:
      return {
        ...state,
        requestStatus: 'idle',
        areas: action.payload,
        areasFetched: true,
      };
    case types.AREA_SUCCESSFULLY_CREATED:
      return { ...state, areas: [...state.areas, action.payload] };
    case types.SINGLE_AREA_FETCH_SUCCESSFUL: {
      const { areas } = state;
      const { areaId } = action.payload;
      const filteredArray = areas.filter(area => area.areaId !== areaId);
      return { ...state, areas: [...filteredArray, action.payload] };
    }
    case types.AREA_NOT_FOUND:
      if (!state.areasNotFound.includes(action.payload)) {
        return {
          ...state,
          areasNotFound: [...state.areasNotFound, action.payload],
        };
      }
      return state;

    case datafeed.Area.TempUpdate:
    case datafeed.Area.HumUpdate:
    case datafeed.Area.TargetSet:
    case datafeed.Area.NodeAdd:
    case datafeed.Area.NewRoutine:
    case datafeed.Area.RemoveRoutine:
    case datafeed.Area.RemoveNode:
    case datafeed.Area.NodesSet:
    case datafeed.Area.SetHeatingEnabled: {
      const { feed } = action.payload;
      const changed = [];
      const unchanged = [];
      Object.keys(feed).forEach(key => {
        state.areas.forEach(area => {
          if (area.areaId === key) {
            changed.push({ ...area, ...feed[key] });
          } else {
            unchanged.push(area);
          }
        });
      });
      return { ...state, areas: [...unchanged, ...changed] };
    }
    // case types.TEMP_UPDATE_SUCCESS:
    // case types.ROUTINE_SUCCESSFULLY_DELETED:
    // case types.SET_NODES_SUCCESSFUL:
    // case types.HEATING_TOGGLE_SUCCESS:
    // case types.ROUTINE_SUCCESSFULLY_ADDED: {
    // const { areaId } = action.payload;
    // const filteredArray = state.areas.filter(area => area.areaId !== areaId);
    // return { ...state, areas: [...filteredArray, action.payload] };
    // }
    // case NODE_SETUP_SUCCESS: {
    //   const { area } = action.payload;
    //   const { areaId } = area;
    //   const filteredArray = state.areas.filter(a => a.areaId !== areaId);
    //   return { ...state, areas: [...filteredArray, action.payload] };
    // }

    default:
      return state;
  }
};

const initialConfigState = {
  newRoomModal: false,
  inProgress: '',
};

const configReducer = (state = initialConfigState, action) => {
  switch (action.type) {
    case types.OPEN_NEW_AREA_MODAL:
      return { ...state, newRoomModal: true };
    case types.CLOSE_NEW_AREA_MODAL:
      return { ...state, newRoomModal: false };
    case types.IN_PROGRESS:
      return { ...state, inProgress: action.payload };
    case types.AREA_SUCCESSFULLY_CREATED:
      return { ...state, inProgress: '' };
    default:
      return state;
  }
};

const initialEditRoutineState = {
  dialogOpen: false,
  routineId: '',
  routineData: '',
};

const editRoutineReducer = (state = initialEditRoutineState, action) => {
  switch (action.type) {
    case types.OPEN_EDIT_ROUTINE_DIALOG:
      return { ...state, dialogOpen: true };
    case types.CLOSE_EDIT_ROUTINE_DIALOG:
      return { ...state, dialogOpen: false };
    case types.RESET_EDIT_ROUTINE_DIALOG:
      return initialEditRoutineState;
    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer,
  config: configReducer,
  editRoutine: editRoutineReducer,
});
