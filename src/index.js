import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from './Redux/ReduxDemo/store'

ReactDOM.render(<App />, document.getElementById('root'));


//redux subcribe
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
})