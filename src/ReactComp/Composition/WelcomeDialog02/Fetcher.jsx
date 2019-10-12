import React from "react";

function Api() {
  return {
    getFooter() {
      return {
        title: "footer",
        name: "button"
      };
    }
  };
}
export default function Fetcher(props) {
  let data = Api()[props.footer]();
  return <div>{props.children(data)}</div>;
}
