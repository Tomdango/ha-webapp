import { combineReducers } from 'redux';
import * as types from '../types/routinesTypes';

const initialRoutinesState = {};

const routinesReducer = (state = initialRoutinesState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialAddRoutineState = {
  dialogOpen: false,
};

const addRoutineReducer = (state = initialAddRoutineState, action) => {
  switch (action.type) {
    case types.OPEN_ADD_MODAL:
      return { ...state, dialogOpen: true };

    case types.CLOSE_ADD_MODAL:
      return { ...state, dialogOpen: false };
    default:
      return state;
  }
};

export default combineReducers({ add: addRoutineReducer });
