"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../../lib/api";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const adminObj = localStorage.getItem("admin_info");

    if (token) {
      setAuthToken(token);
    }
    if (adminObj) {
      setAdmin(JSON.parse(adminObj));
    }

    setLoading(false);
  }, []);

  const login = (token, adminInfo) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_info", JSON.stringify(adminInfo));

    setAuthToken(token);
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_info");

    setAuthToken(null);
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
