import { createContext, useContext, useState } from "react";
import api from "../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") || "";

  const [auth, setAuth] = useState(token);

  const sigIn = (userData, setError, history) => {
    api
      .post("/sessions/", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        setAuth(response.data.access);
        history.push("/dashboard");
      })
      .catch((error) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, sigIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
