import React from 'react'

import { Redirect, Route } from "react-router-dom";


import {connect} from 'react-redux'

// 路由守卫
// 希望用法：<PrivateRoute component={About} path="/about" ...>

const PrivateRoute =({ component: Comp, isLogin, ...rest }) => {
  // 做认证
  // render:根据条件动态渲染组件
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Comp />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { redirect: props.location.pathname }
            }}
          />
        )
      }
    />
  );
}
  

const mapStateToProps = state => ({ isLogin: state.user.isLogin })
  
 export default connect(mapStateToProps)(PrivateRoute);


 //大概就是这样子
