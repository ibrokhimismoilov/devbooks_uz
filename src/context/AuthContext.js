import { createContext } from "react";

const AuthContext = createContext({
  user: {},
  token: "",
  isLoggedIn: false,
  setAuthDetails: () => {},
});

export default AuthContext;
