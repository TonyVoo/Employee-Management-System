import React, { useState, useEffect } from "react";
import { getAccountSettings } from "../services/EmployeeService";
import "../styles/SettingsComponent.css";

const AccountComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const response = await getAccountSettings();
      setUsername(response.data.username || "");
      setEmail(response.data.email || "");
    } catch (error) {
      setMessage("Error fetching account: " + (error.response?.data || error.message));
      setIsError(true);
    }
  };

  return (
    <div className="settings-feature-container">
      <h2>Account Information</h2>
      <div className="settings-form">
        <div>
          <label>Username: {username}</label>
        </div>
      </div>
      {message && (
        <p className={`settings-message ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AccountComponent;