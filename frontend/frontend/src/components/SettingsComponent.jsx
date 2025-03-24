import React, { useState } from "react";
import { updatePassword } from "../services/EmployeeService";
import "../styles/SettingsComponent.css";

const SettingsComponent = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const passwordData = { oldPassword, newPassword };
    try {
      await updatePassword(passwordData);
      setMessage("Password updated successfully");
      setIsError(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage("Error updating password: " + (error.response?.data || error.message));
      setIsError(true);
    }
  };

  return (
    <div className="settings-feature-container">
      <h2>Update Password</h2>
      <form className="settings-form" onSubmit={handlePasswordSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {message && (
        <p className={`settings-message ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SettingsComponent;