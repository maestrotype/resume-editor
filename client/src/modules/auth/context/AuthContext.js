import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout as logoutService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('[AuthContext] Decoded token:', decoded);
        if (decoded) {
          const userData = {
            username: decoded.username,
            avatar: decoded.avatar
          };
          console.log('[AuthContext] Setting user data from token:', userData);
          setUser(userData);
        }
      } catch (error) {
        console.error('[AuthContext] Error decoding token:', error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const setUserAndPersist = (userData) => {
    console.log('[AuthContext] Setting user data:', userData);
    setUser(userData);
  };

  const logout = () => {
    console.log('[AuthContext] Logging out user');
    logoutService();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser: setUserAndPersist, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
