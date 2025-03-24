import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/settings";

// Add a request interceptor to include the JWT token in all requests
const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getGeneralSettings = () => axiosInstance.get("/../settings/general");
export const saveGeneralSettings = (settings) => axiosInstance.post("/../settings/general", settings);
export const updatePassword = (passwordData) => axiosInstance.post("/../settings/general/password", passwordData);
export const getAccountSettings = () => axiosInstance.get("/../settings/account");