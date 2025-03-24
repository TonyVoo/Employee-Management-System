import React, { useState, useEffect } from "react";
import { getLeaveRequests } from "../services/EventService";
import "../styles/AttendanceFeatures.css";

const ViewCalendarComponent = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLeaveRequests = async () => {
    try {
      const response = await getLeaveRequests(employeeId);
      setLeaveRequests(response.data);
      setMessage("");
    } catch (error) {
      setMessage("Error fetching leave requests: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="attendance-feature-container">
      <h2>View Calendar</h2>
      <div className="attendance-form">
        <label>Employee ID:</label>
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <button onClick={fetchLeaveRequests}>Fetch Leave Requests</button>
      </div>
      {leaveRequests.length > 0 && (
        <ul className="leave-list">
          {leaveRequests.map((request) => (
            <li key={request.id}>
              {request.startDate} to {request.endDate} - {request.reason} ({request.status})
            </li>
          ))}
        </ul>
      )}
      {message && <p className="attendance-message error">{message}</p>}
    </div>
  );
};

export default ViewCalendarComponent;