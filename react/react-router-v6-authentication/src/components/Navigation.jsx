import * as React from "react";
import { NavLink } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/admin">Admin</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation;
