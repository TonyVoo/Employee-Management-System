import React, { useState } from "react";
import { offboardEmployee } from "../services/EmployeeService";
import "../styles/OffboardEmployee.css"

const OffboardEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");

  const handleOffboard = async (e) => {
    e.preventDefault();
    try {
      const response = await offboardEmployee(employeeId);
      setMessage(`${response.data.firstName} has been offboarded`);
      setEmployeeId("");
    } catch (error) {
      setMessage("Error offboarding employee: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="offboard-employee-container">
      <div className="offboard-employee-card">
      <h2>Offboard Employee</h2>
      <form onSubmit={handleOffboard}>
        <div>
          <label>Employee ID:</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Offboard</button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default OffboardEmployee;