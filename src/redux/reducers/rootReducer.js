import { combineReducers } from 'redux';
import areasReducer from './areasReducer';
import nodesReducer from './nodesReducer';

export default combineReducers({ nodes: nodesReducer, areas: areasReducer });
