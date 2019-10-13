import { createStore, applyMiddleware ,combineReducers} from 'redux'

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import countReducer from './countReducer' 

//createStore的第二个参数：按照传入顺序执行中间程序
const store = createStore(combineReducers({
  count:countReducer
}),applyMiddleware(logger,thunk))

export default store