
//1.函数式组件

// import React from "react";

// export default function Detail({ name, age, addAge }) {
//   return (
//     <div>
//       <span>{name}</span>:<span>{age}</span>
//       <div onClick={() => addAge()}>click</div>
//     </div>
//   );
// }



//2.类式组件

import React, { Component } from "react";

export default class Detail extends Component {
  render() {
    let { name, age, addAge } = this.props;
    return (
      <div>
        <span>{name}</span>:<span>{age}</span>
        <div onClick={() => addAge()}>click</div>
      </div>
    );
  }
}


//fixme:

//通过高阶组件暴露的addAge方法修改闭包中的age值（确实已经修改）

//为什么，通过高阶组件的暴露的age（已经修改过的）没有得到更新

