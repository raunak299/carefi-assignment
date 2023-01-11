import React from "react";

const AuthContext = React.createContext<{
  login: string;
  email: string;
  setLoginHandler: (username: string, navigateTo: string) => void;
  setLogoutHandler: () => void;
}>({
  login: "",
  email: "",
  setLoginHandler: (username, navigateTo) => {},
  setLogoutHandler: () => {},
});

export default AuthContext;
