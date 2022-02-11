import * as React from "react";
import AuthContext from "../stores/AuthContext";

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
