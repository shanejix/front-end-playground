

const defaultUser = {
  userId: '',
  message: ''
}

export default (user = defaultUser, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return {
        userId: action.userId,
        message:'fetch user success'
      };

    case "USER_FETCH_FAILED":

      return {
        userId: '',
        message:'fetch userid false'
      };

    default:
      return user;
  }
}