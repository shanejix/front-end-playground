import React, { useContext } from "react";

import ctx from './Context'

export default function Child02() {

  //2.0 Context使用：useContext
  let context = useContext(ctx)

  return <div>Name:{context.name}</div>;
}
