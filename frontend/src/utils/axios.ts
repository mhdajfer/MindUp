import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: false,
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });
