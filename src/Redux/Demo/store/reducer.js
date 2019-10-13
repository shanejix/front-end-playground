const countReducer = (count = 0, action) => {
  switch (action.type) {
    case "add":
      return count + 1;

    case "minus":
      return count - 1;
    default:
      return count;
  }
};

export default countReducer;
