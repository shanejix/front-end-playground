import React from "react";

export default function Radio({children,...rest}) {
  return (
    <label>
      {/* //props:包含children和name和value */}
      <input type="radio" {...rest} />
      {children}
    </label>
  );
}
