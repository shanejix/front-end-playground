import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//react-redux
import { Provider } from 'react-redux'
import rr_store from './ReactRedux/Demo/store'

//redux
import store from './Redux/Demo/store'

ReactDOM.render(
  <Provider store={rr_store}>
    <App />
  </Provider>,
  document.getElementById('root'));


// redux subcribe
store.subscribe(() => {
  ReactDOM.render(
    <Provider store={rr_store}>
      <App />
    </Provider>,
    document.getElementById('root'));
})