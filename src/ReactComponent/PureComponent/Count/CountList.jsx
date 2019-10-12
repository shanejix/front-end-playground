import React, { Component } from "react";

import Count from "./Count";

export default class CountList extends Component {
  constructor() {
    super();

    this.state = {
      list: [0, 1, 2]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: [...this.state.list]
      });
    }, 1000);
  }
  
  render() {
    let list = this.state.list;
    return (
      <div>
        {list.length
          ? list.map((count, idx) => {
              return <Count key={idx} count={count} />;
            })
          : null}
      </div>
    );
  }
}
