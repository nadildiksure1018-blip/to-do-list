import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{success:boolean,message:any}>;
  register: (email: string, password: string, name?: string) => Promise<{success:boolean,message:any}>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user, message } = response.data;

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return {success: true, message} //check finally

    } catch (error: any) {
      const message = (error.response?.data?.message || "Login failed");
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user/createUser", { email, password});
      return{ 
        success: true,
        message: response.data.message
      }

    } catch (error: any) {
      const message = (error.response?.data?.message || "Registration failed");
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
