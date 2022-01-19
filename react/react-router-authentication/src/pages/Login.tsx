import React from 'react';
import { Link } from 'react-router-dom';

function Login(props: any) {
  const { loginAsUser, history } = props;

  const userLoginHandler = () => {
    // 调用父级方法设置用户权限
    loginAsUser();
    // 登录后跳转后台页面
    history.replace('/management');
  }

  return (
    <>
      <h1>this is login page</h1>
      <button onClick={userLoginHandler}>login</button>
      <br /><br />
      <Link to="/">back to home</Link>
    </>
  );
}

export default Login;