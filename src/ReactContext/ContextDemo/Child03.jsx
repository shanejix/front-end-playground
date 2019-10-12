import React, { Component } from "react";

import ctx from "./Context";

export default class Child03 extends Component {
  
  //3.0 使用contextType
  static contextType = ctx;

  render() {
    return <div>Name:{this.context.name}</div>;
  }
}
