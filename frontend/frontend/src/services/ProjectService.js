import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/projects";

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

export const listProjects = () => axiosInstance.get("");

export const createProject = (project) => axiosInstance.post("", project);

export const getProject = (projectId) => axiosInstance.get(`/${projectId}`);

export const getAnalytics = () => axiosInstance.get("/analytics");

export const updateProject = (projectId, project) =>
  axiosInstance.put(`/${projectId}`, project);