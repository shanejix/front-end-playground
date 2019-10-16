import React from "react";

import "./layout.css";

export default function Layout({ children }) {
  return (
    <div>
      {/* nav */}
      {React.Children.map(children, child => {
        if (child.props.className === "nav") {
          return child;
        }
      })}
      <div className="container">
        {/* main */}
        {React.Children.map(children, child => {
          if (child.props.className === "main") {
            return child;
          }
        })}
      </div>
    </div>
  );
}
