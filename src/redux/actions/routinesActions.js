import * as types from '../types/routinesTypes';

export const openCreateGlobalRoutineDialog = () => {
  return { type: types.OPEN_ADD_MODAL };
};

export const closeCreateGlobalRoutineDialog = () => {
  return { type: types.CLOSE_ADD_MODAL };
};

export const addRoutine = () => {};
