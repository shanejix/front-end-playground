// Suppose we have a UI to fetch some user data from a remote server when a button is clicked

import React from "react";

import { connect } from "react-redux";
import { Button } from "antd";

import { fetchUser } from "../store/actions";

function User({ fetchUser, user }) {
  const id = "1";

  const handleClick = () => {
    fetchUser(id);
  };
  return (
    <div>
      {console.log(user)}
      <Button onClick={handleClick}>click</Button>
    </div>
  );
}

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  state => ({
    user: state
  }),
  mapDispatchToProps
)(User);
