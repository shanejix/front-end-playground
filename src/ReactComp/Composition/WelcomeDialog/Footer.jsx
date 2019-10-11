import React from "react";

export default function Footer() {
  let handleClick = () => {
    alert("hellow this is dialog footer");
  };

  return <button onClick={() => handleClick()}>click</button>;
}
