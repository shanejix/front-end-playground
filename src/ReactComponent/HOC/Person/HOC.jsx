import React from "react";

export function WithData(Comp) {
  //do some things
  console.log("@WithData");

  let name = "Niao";
  let age = "22";

  let addAge = () => {
    age++;
    console.log(age);
  };

  //wrapper：类式组件
  return class extends React.Component {
    componentDidMount() {
      //do anothier things
    }

    render() {
      return <Comp {...this.props} name={name} age={age} addAge={addAge} />;
    }
  };
}

export function WithLog(Comp) {
  //do some things
  console.log("@WithLog");

  //wrapper:函数式组件
  return function CompWrapper(props) {
    //do anotheir things
    return <Comp {...props} />;
  };
}
