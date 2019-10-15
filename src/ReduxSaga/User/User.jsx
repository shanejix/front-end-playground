// Suppose we have a UI to fetch some user data from a remote server when a button is clicked

import React from "react";

import { connect } from "react-redux";
import { Button } from "antd";

import { fetchUser } from "../store/actions";

import store from '../store'

function User({ fetchUser, user }) {
  return (
    <div>
      {console.log(user)}
      {console.log(store.getState())}

      <Button onClick={() => fetchUser("1")}>click</Button>
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
