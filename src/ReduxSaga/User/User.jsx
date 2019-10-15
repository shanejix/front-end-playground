// Suppose we have a UI to fetch some user data from a remote server when a button is clicked

import React from "react";

import { connect } from "react-redux";
import { Button } from "antd";

function User() {
  const handleClick = ({ userId, dispatch }) => {
    console.log(userId,dispatch);
    
    dispatch({ type: "USER_FETCH_REQUESTED", payload: { userId } });
  };
  return <Button onClick={handleClick}>click</Button>;
}

const mapStateToProps = state => ({
  userId: state.userId
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
