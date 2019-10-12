import React, { Component } from "react";

import { Input, Icon, Button } from "antd";



//创建一个高阶组件：扩展现有组件的的功能：（包含）数据收集，表单验证，提交， 事件处理。。。

function create(Comp) {
  
  return class extends Component{

    render() {
      return <Comp></Comp>
    }
  }
}


//模拟事项antd的表单组件

@create//使用装饰器
class Form extends Component {
  render() {
    return (
      <div>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Basic usage"
        ></Input>

        <Button type="primary">Login</Button>
      </div>
    );
  }
}


export default Form