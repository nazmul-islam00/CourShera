import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { fetchLoginSuccess } from "../../api/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchLoginSuccess();
        if (response.status === 200) {
          const responseObject = await response.json();
          setUser(responseObject.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Not authenticated or server error", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const value = { user, isLoading, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
