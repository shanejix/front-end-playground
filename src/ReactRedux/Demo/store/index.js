import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer' 

//createStore的第二个参数：按照传入顺序执行中间程序
const  store = createStore(reducer,applyMiddleware(logger,thunk))

export default store