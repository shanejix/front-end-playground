import React, { Component } from "react";

import { Input, Button } from "antd";

//创建一个高阶组件：扩展现有组件的的功能：（包含）数据收集，表单验证，提交， 事件处理。。。
function create(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {};
      this.options = {};
    }

    handleChange = e => {
      let { name, value } = e.target;
      console.log(name, value);

      this.setState(
        {
          [name]: value
        },
        () => {
          //确保状态更新后，再做校验
          this.validateField(name);
        }
      );
    };

    validateField = field => {
      //1.获取校验规则
      let rules = this.options[field].rules;

      //2.校验，任意一项失败反汇编false
      const ret = !rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            //校验失败
            this.setState({ [field + "Message"]: rule.message });

            return true;
          }
        }

        return false
      });

      //校验成功，清空错误信息
      if (ret) {
        this.setState({ [field + "Message"]: "" });
      }

      //校验失败，返回false
      return ret;
    };

    validate = callback => {
      const rets = Object.keys(this.options).map(field =>
        this.validateField(field)
      );

      const res = rets.every(f => f === true);

      callback(res, this.state);
    };

    getFieldDecorator = (field, option) => {
      //缓存当前域的option
      this.options[field] = option;

      return InputComp => (
        <div>
          {React.cloneElement(InputComp, {
            name: field,
            value: this.state[field] || "",
            onChange: this.handleChange
          })}
          {/* 显示错误信息 */}
          {this.state[field + "Message"] && (
            <p style={{ color: "red" }}>{this.state[field + "Message"]}</p>
          )}
        </div>
      );
    };

    render() {
      return (
        <Comp
          getFieldDecorator={this.getFieldDecorator}
          validate={this.validate}
        />
      );
    }
  };
}

//模拟事项antd的表单组件
@create //使用装饰器
class Form extends Component {
  onSubmit = () => {
    console.log("submit");

    //校验所有字段

    this.props.validate((isvalid, data) => {
      if (isvalid) {
        //校验成功，登录
        console.log("login:", data);
      } else {
        //校验失败，后续逻辑
        alert("数据校验失败！！！");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props;

    return (
      <div>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(<Input placeholder="Username" />)}

        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(<Input placeholder="Password" type="password" />)}

        <Button type="primary" onClick={this.onSubmit}>
          Login
        </Button>
      </div>
    );
  }
}

export default Form;
