import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';
import Authentication from './components/Authentication';

function App() {
  const [user, setUser] = useState({});

  const loginAsUser = () => {
    setUser({
      role: ['user']
    });
  }

  const loginAsAdmin = () => {
    setUser({
      role: ['user', 'admin']
    });
  }

  return (
    <Router>
      <Switch>
        {
          publicRoutes.map(
            ({ path, component, ...route }) => (
              <Route
                key={path}
                path={path}
                render={(routeProps: any) => {
                  const Component = component;
                  return (
                    <Component loginAsUser={loginAsUser} loginAsAdmin={loginAsAdmin} {...routeProps} />
                  )
                }}
                {...route}
              />
            )
          )
        }
        {
          privateRoutes.map(
            (route) => <Authentication key={route.path} {...route} user={user} />
          )
        }

      </Switch>
    </Router>
  );
}

export default App;
