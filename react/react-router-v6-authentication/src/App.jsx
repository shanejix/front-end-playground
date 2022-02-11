import * as React from "react";
import AuthProvider from "./components/AuthProvider";
import Navigation from "./components/Navigation";
import Router from "./Router";

const App = () => {
  return (
    <AuthProvider>
      <h1>React Router V6</h1>
      <Navigation />
      <Router />
    </AuthProvider>
  );
};

export default App;
