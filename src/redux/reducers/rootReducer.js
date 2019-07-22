import { combineReducers } from 'redux';
import areasReducer from './areasReducer';
import nodesReducer from './nodesReducer';
import routinesReducer from './routinesReducer';

export default combineReducers({
  nodes: nodesReducer,
  areas: areasReducer,
  routines: routinesReducer,
});
