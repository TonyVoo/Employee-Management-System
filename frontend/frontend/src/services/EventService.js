import axios from "axios";
import { getToken } from "./AuthService";

const API_URL = "http://localhost:8080/api";

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token in all requests
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

export const listEvents = async () => {
  try {
    const response = await axiosInstance.get("/events");
    // Ensure the response data is an array; if not, return an empty array
    return { data: Array.isArray(response.data) ? response.data : [] };
  } catch (error) {
    console.error("Error fetching events:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch events");
  }
};

export const createEvent = async (event) => {
  try {
    const response = await axiosInstance.post("/events", event);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to add event");
  }
};

export const clockIn = (employeeId) =>
  axiosInstance.post(`/attendance/clock-in/${employeeId}`);

export const clockOut = (attendanceId) =>
  axiosInstance.put(`/attendance/clock-out/${attendanceId}`);

export const createLeaveRequest = (employeeId, leaveRequest) =>
  axiosInstance.post(`/leave-requests/${employeeId}`, leaveRequest);

export const getLeaveRequests = (employeeId) =>
  axiosInstance.get(`/leave-requests/employee/${employeeId}`);

export const updateLeaveStatus = (leaveId, status) =>
  axiosInstance.put(`/leave-requests/${leaveId}/status`, status, {
    headers: { "Content-Type": "text/plain" },
  });