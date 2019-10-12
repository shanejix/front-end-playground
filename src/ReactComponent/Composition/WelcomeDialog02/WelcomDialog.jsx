import React from "react";

import Dialog from "./Dialog";

//通过复合提供内容——Compositon
export default function WelcomDialog(props) {
  return (
    <Dialog {...props}>
      <h1>WelcomDialog</h1>
      <div>hollow world!!!</div>
    </Dialog>
  );
}
