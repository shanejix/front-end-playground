import React from "react";

import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

// import PrivateRoute from '../PrivateRoute'

function Home() {
  return (
    <div>
      <h3>IT</h3>
      <ul>
        <li>
          <Link to="/detail/web">Web</Link>
        </li>
        <li>
          <Link to="/detail/python">Python</Link>
        </li>
      </ul>
    </div>
  );
}

function About(params) {
  return (
    <div>
      <h3>个人中心</h3>
      <div>
        <Link to="/about/me">个人信息</Link>
        <Link to="/about/order">订单查询</Link>
      </div>
      <Switch>
        <Route path="/about/me" component={() => <div>Me</div>} />
        <Route path="/about/order" component={() => <div>order</div>} />
        <Redirect to="/about/me" />
      </Switch>
    </div>
  );
}

// 传递进来路由器对象
function Detail(props) {
  // 1.history: 导航指令
  // 2.match: 获取参数信息
  // 3.location: 当前url信息
  console.log(props);

  return (
    <div>
      当前课程：{props.match.params.course}
      <button onClick={props.history.goBack}>后退</button>
    </div>
  );
}

function Login({ location, isLogin, login, loading }) {
  // console.log(location);

  const redirect = "/";

  isLogin = isLogin || true;
  loading = loading || false;

  

  if (isLogin) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <p>用户登录</p>
      <hr />
      <button onClick={login} disabled={loading}>
        {loading ? "登录中..." : "登录"}
      </button>
    </div>
  );
}

function NoMatch({ location }) {
  return <div>404, {location.pathname}不存在</div>;
}

export default function Index() {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* 导航链接 */}
          <div>
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
          </div>
          {/* 路由配置：路由即组件 */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/detail/:course" component={Detail} />
            {/* <PrivateRoute path="/about" component={About} /> */}
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            {/* 404：没有path，必然匹配 */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
