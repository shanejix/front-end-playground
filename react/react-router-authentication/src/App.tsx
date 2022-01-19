import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import Authentication from "./components/Authentication";

function App() {
  const [user, setUser] = useState({});

  const loginAsUser = () => {
    setUser({
      role: ["user"],
    });
  };

  return (
    <Router>
      <Switch>
        {publicRoutes.map(({ path, component: Component, ...route }) => (
          <Route
            key={path}
            path={path}
            render={(routeProps: any) => (
              <Component loginAsUser={loginAsUser} {...routeProps} />
            )}
            {...route}
          />
        ))}
        {privateRoutes.map((route) => (
          <Authentication key={route.path} {...route} user={user} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
