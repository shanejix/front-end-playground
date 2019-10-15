// https://www.npmjs.com/package/redux-thunk

// Motivation

// Redux Thunk middleware allows you to write action creators that return a function instead of an action.

// The inner function receives the store methods dispatch and getState as parameters.


// 1.0 An action creator that returns a function to perform asynchronous dispatch:

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
 
function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}
 
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}

// 2.0An action creator that returns a function to perform conditional dispatch:

function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();
 
    if (counter % 2 === 0) {
      return;
    }
 
    dispatch(increment());
  };
}