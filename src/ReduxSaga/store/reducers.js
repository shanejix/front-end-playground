

const defaultUser = {
  id: '',
  name: '',
  age: '',
  message: ''
}

export default (user = defaultUser, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return {
        userId: action.user.id,
        name: action.user.name,
        age: action.user.age,
        message: 'fetch user success'
      };

    case "USER_FETCH_FAILED":

      return {
        userId: '',
        name: '',
        age: '',
        message: 'fetch userid false'
      };

    default:
      return user;
  }
}