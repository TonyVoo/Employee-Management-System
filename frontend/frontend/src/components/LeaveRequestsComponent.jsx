import React, { useState } from "react";
import { createLeaveRequest } from "../services/EventService";
import "../styles/AttendanceFeatures.css";

const LeaveRequestsComponent = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const leaveRequest = { startDate, endDate, reason };
    try {
      const response = await createLeaveRequest(employeeId, leaveRequest);
      setMessage(`Leave request submitted for ${response.data.startDate} to ${response.data.endDate}`);
      setIsError(false);
      setEmployeeId("");
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      setMessage("Error submitting leave request: " + (error.response?.data || error.message));
      setIsError(true);
    }
  };

  return (
    <div className="attendance-feature-container">
      <h2>Submit Leave Request</h2>
      <form className="attendance-form" onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
      {message && (
        <p className={`attendance-message ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LeaveRequestsComponent;