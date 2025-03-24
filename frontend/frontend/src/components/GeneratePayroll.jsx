import React, { useState } from "react";
import { generatePayroll } from "../services/EmployeeService";
import "../styles/PayrollFeatures.css";

const GeneratePayroll = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await generatePayroll(employeeId, startDate, endDate);
      setMessage(`Payroll generated for ${response.data.employee.firstName} - Net Pay: $${response.data.netPay}`);
      setIsError(false);
      setEmployeeId("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      setMessage("Error generating payroll: " + (error.response?.data || error.message));
      setIsError(true);
    }
  };

  return (
    <div className="payroll-feature-container">
      <h2>Generate Payroll</h2>
      <form className="payroll-form" onSubmit={handleSubmit}>
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
          <label>Pay Period Start:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pay Period End:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Payroll</button>
      </form>
      {message && (
        <p className={`payroll-message ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default GeneratePayroll;