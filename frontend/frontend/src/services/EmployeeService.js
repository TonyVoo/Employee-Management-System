import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

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

export const listEmployees = () => axiosInstance.get("");

export const createEmployee = (employee) => axiosInstance.post("", employee);

export const getEmployee = (employeeId) => axiosInstance.get(`/${employeeId}`);

export const updateEmployee = (employeeId, employee) =>
  axiosInstance.put(`/${employeeId}`, employee);

export const deleteEmployee = (employeeId) => axiosInstance.delete(`/${employeeId}`);

export const addPerformanceReview = (employeeId, review) =>
  axiosInstance.put(`/${employeeId}/performance-review`, review, {
    headers: { "Content-Type": "text/plain" },
  });

export const offboardEmployee = (employeeId) =>
  axiosInstance.put(`/${employeeId}/offboard`);

export const generatePayroll = (employeeId, startDate, endDate) =>
  axiosInstance.post(`/payroll/generate/${employeeId}`, null, {
    params: { startDate, endDate },
  });

export const getPayslips = (employeeId) =>
  axiosInstance.get(`/payroll/payslips/${employeeId}`);

export const updatePassword = (passwordData) => axiosInstance.post("/../settings/general/password", passwordData);
export const getAccountSettings = () => axiosInstance.get("/../settings/account");