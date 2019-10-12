//1.函数式组件

//渲染6次，

// import React from "react";

// export default function Count({ count }) {
//   console.log("render count");

//   return <div>{count}</div>;
// }

//2.PureComponent组件

//渲染3次

//PureComponent特点：

//1.shallowCompare（浅层比较）

//2.定制shouldComponentUpdate后的Component

// import React, { PureComponent } from "react";

// export default class Count extends PureComponent {
//   render() {
//     console.log("render count");

//     let { count } = this.props;
//     return <div>{count}</div>;
//   }
// }

//3.Implementation PureComponet

// import React from "react";

// import PureComponent from '../Implementation'

// export default class Count extends PureComponent {
//   render() {
//     console.log("render count (implementation)");

//     let { count } = this.props;
//     return <div>{count}</div>;
//   }
// }

//4.React.memo让函数式组件拥有PureComponent的功能

import React from "react";

let Count = React.memo(({ count }) => (
  <div>
    {count}
    {console.log("render count")}
  </div>
));

export default Count;
