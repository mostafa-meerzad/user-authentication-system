import { createContext, useContext, useState } from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userDate) => {
    setUser(userDate);
  };
  const logOut = () => {
    console.log("logout called")
    setUser(null);

    navigate("/");
    };
  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
