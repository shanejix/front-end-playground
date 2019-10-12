import { Component } from "react";

import shallowEqual from "./shallowEqual";

export default function PureComponent(props, context) {
  Component.call(this, props, context);
}

PureComponent.prototype = Object.create(Component.prototype);
PureComponent.prototype.constructor = PureComponent;
PureComponent.prototype.isPureComponent = true;
PureComponent.prototype.shouldComponentUpdate = shallowCompare;

function shallowCompare(nextProps, nextState) {

  return (
    !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  );
}
