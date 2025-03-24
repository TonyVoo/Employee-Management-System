import React, { useState, useEffect } from "react";
import { getPayslips } from "../services/EmployeeService";
import "../styles/PayrollFeatures.css";

const ViewPayslips = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [payslips, setPayslips] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPayslips = async () => {
    try {
      const response = await getPayslips(employeeId);
      setPayslips(response.data);
      setMessage("");
    } catch (error) {
      setMessage("Error fetching payslips: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="payroll-feature-container">
      <h2>View Payslips</h2>
      <div className="payroll-form">
        <label>Employee ID:</label>
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <button onClick={fetchPayslips}>Fetch Payslips</button>
      </div>
      {payslips.length > 0 && (
        <ul className="payslip-list">
          {payslips.map((payslip) => (
            <li key={payslip.id}>
              {payslip.payPeriodStart} to {payslip.payPeriodEnd} - Base: ${payslip.baseSalary}, 
              Overtime: ${payslip.overtimePay}, Deductions: ${payslip.deductions}, Net: ${payslip.netPay}
            </li>
          ))}
        </ul>
      )}
      {message && <p className="payroll-message error">{message}</p>}
    </div>
  );
};

export default ViewPayslips;