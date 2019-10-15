import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



//redux
import store from './Redux/store'


ReactDOM.render(
  <App />,
  document.getElementById('root'));


// redux subcribe
store.subscribe(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'));
})