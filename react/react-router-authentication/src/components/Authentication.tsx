import React from "react";
import { Route, Redirect } from "react-router-dom";

function Authentication(props: any) {
  const {
    user: { role: userRole },
    role: routeRole,
    backUrl,
    ...otherProps
  } = props;

  // 如果用户有权限，就渲染对应的路由
  if (userRole && userRole.includes(routeRole)) {
    return <Route {...otherProps} />;
  } else {
    // 如果没有权限，返回配置的默认路由
    return <Redirect to={backUrl} />;
  }
}

export default Authentication;
