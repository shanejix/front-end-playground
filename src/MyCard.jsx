import React from "react";

import { Card } from "antd";

const basename = "https://github.com/shanejix/make-wheels/tree/master/src/";

export default function MyCard({ children, pathname, width, height }) {
  const style = {
    width: width || 320,
    height: height || 320,
    margin: 10,
    overflow: "hidden",
  };
  return (
    <Card
      title={pathname}
      extra={<a href={basename + pathname}>More</a>}
      style={style}
    >
      {children}
    </Card>
  );
}
