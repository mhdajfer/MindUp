import axios from "axios";
import Cookies from "js-cookie";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

if (!API) console.log("api not provided");

export const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: false,
});
// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: false,
// });

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
