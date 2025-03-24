import React, { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import { FaUsers, FaBuilding, FaDollarSign } from "react-icons/fa";
import "../styles/DashboardComponent.css";

const DashboardComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEmployee();
  }, []);

  function getAllEmployee() {
    setLoading(true);
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch employees: " + error.message);
        setLoading(false);
      });
  }

  const totalEmployees = employees.length;
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

  const recentEmployees = employees
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Employee Management Dashboard</h2>

      {loading ? (
        <p className="loading-text">Loading dashboard...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h3>Total Employees</h3>
              <p className="stat-value">{totalEmployees}</p>
            </div>
            <div className="stat-card">
              <FaBuilding className="stat-icon" />
              <h3>Departments</h3>
              <p className="stat-value">{departments.length}</p>
            </div>
          </div>

          {/* Recent Employees */}
          <div className="recent-employees">
            <h3>Recent Employees</h3>
            {recentEmployees.length === 0 ? (
              <p className="no-data">No recent employees</p>
            ) : (
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{`${employee.firstName} ${employee.lastName}`}</td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Department Breakdown */}
          <div className="department-breakdown">
            <h3>Department Breakdown</h3>
            {departments.length === 0 ? (
              <p className="no-data">No departments found</p>
            ) : (
              <ul className="department-list">
                {departments.map((dept, index) => {
                  const deptCount = employees.filter((emp) => emp.department === dept).length;
                  return (
                    <li key={index}>
                      <span className="dept-name">{dept}</span>: <span className="dept-count">{deptCount}</span> employees
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;