

const defaultState = {
  userId: '',
  message: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":

      return { user: action.user };

    case "USER_FETCH_FAILED":

      return { user: action.message };

    default:
      return state;
  }
}