// import { Redirect, Route } from "react-router-dom";

// // 路由守卫
// // 希望用法：<PrivateRoute component={About} path="/about" ...>
// const PrivateRoute = connect(state => ({ isLogin: state.user.isLogin }))(
//   ({ component: Comp, isLogin, ...rest }) => {
//     // 做认证
//     // render:根据条件动态渲染组件
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           isLogin ? (
//             <Comp />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { redirect: props.location.pathname }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }
// );


//不做具体实现了。