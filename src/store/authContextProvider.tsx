import { useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "./authContext";

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [login, setLogin] = useState(localStorage.getItem("login") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const history = useHistory<string>();

  const setLoginHandler = (email: string, navigateTo: string) => {
    localStorage.setItem("login", "true");
    localStorage.setItem("email", email);
    setLogin("true");
    setEmail(email);
    history.push(navigateTo);
  };

  const setLogoutHandler = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("email");
    setLogin("false");
    setEmail("");
  };

  const currValue = {
    login,
    email,
    setLoginHandler,
    setLogoutHandler,
  };

  return (
    <AuthContext.Provider value={currValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
