const apiRoot = 'http://localhost:3000/api/';
const webSocketRoot = 'ws://localhost:3000/datafeed/';

export const area = {
  all: `${apiRoot}areas`,
  single: id => `${apiRoot}areas/${id}`,
  createArea: `${apiRoot}areas/create`,
  tempHistory: id => `${apiRoot}areas/${id}/temp-history`,
  setTarget: id => `${apiRoot}areas/${id}/set-target`,
  addRoutine: id => `${apiRoot}areas/${id}/add-routine`,
  deleteRoutine: (id, routineId) =>
    `${apiRoot}areas/${id}/routines/${routineId}`,
  setNodes: id => `${apiRoot}areas/${id}/set-nodes`,
  setHeating: (id, on) => `${apiRoot}areas/${id}/heating/${on ? 'on' : 'off'}`,
};

export const nodes = {
  getUninitialised: `${apiRoot}nodes/uninitialized`,
  getAreas: `${apiRoot}nodes/areas`,
  setup: id => `${apiRoot}nodes/${id}/setup`,
  all: `${apiRoot}nodes`,
};

export const datafeed = {
  areas: `${webSocketRoot}areas`,
};
