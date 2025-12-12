// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // your backend port
});

// helper to set token
export const setAuthToken = (token:any) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

export default api;
