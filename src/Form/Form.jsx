import React, { Component } from "react";

import { Input, Button } from "antd";

//创建一个高阶组件：扩展现有组件的的功能：（包含）数据收集，表单验证，提交， 事件处理。。。
function create(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {}
      this.options = {}
    }

    handleChange = (e) => {
      let { name, value } = e.target
      console.log(name,value);
      
      this.setState({
        [name]: value
      })
      
    }
    getFieldDecorator = (field, option) => {

      //缓存当前域的option
      this.options[field] = option;

      return InputComp => {
        return React.cloneElement(InputComp, {
          name: field,
          value: this.state[field] || '',
          onChange:this.handleChange
        });
      };
    };


    render() {
      return <Comp getFieldDecorator={this.getFieldDecorator} />;
    }
  };
}

//模拟事项antd的表单组件
@create //使用装饰器
class Form extends Component {
  render() {
    const { getFieldDecorator } = this.props;

    return (
      <div>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(<Input placeholder="Username" />)}

        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(<Input placeholder="Password" />)}

        <Button type="primary">Login</Button>
      </div>
    );
  }
}

export default Form;
