import React from "react";

import store from "../store";
import { add, minus } from "../store/actions";

export default function Count() {
  return (
    <div>
      <span>{store.getState()}</span>
      <button onClick={() => store.dispatch(add())}>+</button>
      <button onClick={() => store.dispatch(minus())}>-</button>
    </div>
  );
}
