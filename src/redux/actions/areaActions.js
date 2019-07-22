/* eslint-disable no-console */
import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from '../types/areaTypes';
import { area } from '../../core/constants/routes';
import { homepage } from '../../../package.json';

export const getAreaStatus = () => {
  return dispatch => {
    dispatch({ type: types.FETCHING_AREA_DATA });
    axios
      .get(area.all)
      .then(response => {
        dispatch({
          type: types.AREA_DATA_FETCHED,
          payload: response.data,
        });
      })
      .catch(console.error);
  };
};

export const openNewAreaDialog = () => {
  return { type: types.OPEN_NEW_AREA_MODAL };
};

export const closeNewAreaDialog = () => {
  return { type: types.CLOSE_NEW_AREA_MODAL };
};

export const createArea = (name, browserHistory, callback) => {
  return dispatch => {
    dispatch({ type: types.IN_PROGRESS, payload: 'createNewArea' });
    axios
      .post(area.createArea, { name })
      .then(response => {
        const { document } = response.data;
        dispatch({ type: types.AREA_SUCCESSFULLY_CREATED, payload: document });
        dispatch(closeNewAreaDialog());
        browserHistory.push(`${homepage}/areas/${document.areaId}`);
        callback();
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: types.AREA_CREATION_FAILED });
      });
  };
};

export const fetchAreaData = id => {
  return dispatch => {
    dispatch({ type: types.SINGLE_AREA_FETCH });
    axios
      .get(area.single(id))
      .then(response => {
        const { data } = response;
        dispatch({ type: types.SINGLE_AREA_FETCH_SUCCESSFUL, payload: data });
      })
      .catch(err => {
        if (err.response.status === 404) {
          dispatch({ type: types.AREA_NOT_FOUND, payload: id });
        }
      });
  };
};

export const updateTargetTemperature = (id, temp) => {
  return dispatch => {
    dispatch({ type: types.TEMP_UPDATE });
    axios
      .post(area.setTarget(id), {
        target: Number(temp),
      })
      .then(response => {
        const { data } = response;
        toast.success('Successfully updated target temperature.');
        dispatch({ type: types.TEMP_UPDATE_SUCCESS, payload: data });
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to update target temperature.');
      });
  };
};

export const addNewRoutine = (id, routine) => {
  return dispatch => {
    axios
      .post(area.addRoutine(id), {
        routine,
      })
      .then(response => {
        const { data } = response;
        dispatch({ type: types.ROUTINE_SUCCESSFULLY_ADDED, payload: data });
        toast.success('Routine Successfullly Created.');
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to create routine.');
      });
  };
};

export const deleteRoutine = (id, routineId) => {
  return dispatch => {
    axios
      .delete(deleteRoutine(id, routineId))
      .then(response => {
        const { data } = response;
        dispatch({ type: types.ROUTINE_SUCCESSFULLY_DELETED, payload: data });
        toast.success('Routine Successfully Deleted.');
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to delete routine.');
      });
  };
};

export const deleteArea = id => {
  return dispatch => {
    axios
      .delete(area.single(id))
      .then(() => {
        dispatch({ type: types.AREA_SUCCESSFULLY_DELETED, payload: id });
        toast.success(
          'Area successfully deleted. Assigned Nodes are now unassigned.',
        );
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to delete area.');
      });
  };
};

export const setNodes = (id, nodes) => {
  return dispatch => {
    axios
      .post(area.setNodes(id), {
        nodes,
      })
      .then(response => {
        dispatch({ type: types.SET_NODES_SUCCESSFUL, payload: response.data });
        toast.success('Set Nodes successfully.');
      })
      .catch(() => {
        toast.error('Failed to set nodes.');
      });
  };
};

export const toggleHeating = (id, on) => {
  return dispatch => {
    axios
      .post(area.setHeating(id, on))
      .then(response => {
        dispatch({
          type: types.HEATING_TOGGLE_SUCCESS,
          payload: response.data,
        });
        toast.success(`Successfully toggled heating ${on ? 'on' : 'off'}`);
      })
      .catch(() => {
        toast.error('Failed to toggle heating.');
      });
  };
};
