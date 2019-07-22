import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from '../types/nodeTypes';
import { nodes } from '../../core/constants/routes';

export const getAreaData = () => {
  return dispatch => {
    dispatch({ type: types.FETCHING_AREA_DATA });
    axios.get(nodes.getAreas).then(response => {
      dispatch({
        type: types.AREA_DATA_FETCHED,
        payload: response.data,
      });
    });
  };
};

export const fetchNodeInfo = (id, name) => {
  return dispatch => {
    dispatch({ type: types.SET_ACTIVE_NODE, payload: { id, name } });
    dispatch({ type: types.FETCHING_NODE_INFO });
    setTimeout(() => {
      const apiResponse = {
        name: 'Radiator (Balcony)',
        type: 'Heater',
        timeOn: {
          today: 6000,
          week: 48000,
        },
        status: true,
        on: true,
        power: 2000,
        firmwareVersion: '1.0.0',
      };
      dispatch({ type: types.NODE_INFO_FETCHED, payload: apiResponse });
    }, 1000);
  };
};

export const directLoad = id => fetchNodeInfo(id, '');

export const nodesDiscovered = discoveredNodes => {
  return { type: types.DISCOVERED_NEW_NODE, payload: discoveredNodes };
};

export const startNodeSetup = nodeId => {
  return { type: types.START_NODE_SETUP, payload: nodeId };
};

export const closeSetupDialog = () => {
  return { type: types.CLOSE_NODE_SETUP };
};

export const cancelSetup = () => {
  return { type: types.CANCEL_NODE_SETUP };
};

export const setupNode = (id, name, areaId) => {
  return dispatch => {
    dispatch(closeSetupDialog());
    axios
      .post(nodes.setup(id), { name, areaId })
      .then(response => {
        const { data } = response;
        toast.success('Successfully setup Node.');
        dispatch({ type: types.NODE_SETUP_SUCCESS, payload: data });
      })
      .catch(() => {
        toast.error('Failed to setup node.');
      });
  };
};

export const fetchAllNodes = () => {
  return dispatch => {
    axios.get(nodes.all).then(response => {
      const { data } = response;
      dispatch({ type: types.NODE_DATA_FETCHED, payload: data });
    });
  };
};
