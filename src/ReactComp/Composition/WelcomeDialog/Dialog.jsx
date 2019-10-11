import React from "react";

//只负责样式，不关心内容和逻辑
export default function Dialog(props) {
  console.log(props);

  return (
    <div style={{ border: `${props.color} 4px solid` }}>
      {props.children}
      <div className="footer">{props.footer}</div>
    </div>
  );
}
