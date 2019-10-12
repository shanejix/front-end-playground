import React from "react";

import Dialog from "./Dialog";

function Filter({ children, type }) {
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type !== "p") {
          return;
        }

        return child;
      })}
    </div>
  );
}

//通过复合提供内容——Compositon
export default function WelcomDialog(props) {
  return (
    <Dialog {...props}>
      <h1>WelcomDialog</h1>
      <div>hollow world!!! 03</div>
      <Filter type="p">
        <p>react 我很熟练哦</p>
        <div>vue 还不会</div>
        <p>react-router 很厉害呢</p>

        <div>vue-router 还不会</div>
        <p>redux 我很精通了</p>

        <div>vuex 还不会</div>
        <p>了解nodejs</p>
      </Filter>
    </Dialog>
  );
}
