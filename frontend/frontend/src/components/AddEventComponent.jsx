import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddEventComponent.css";
import { createEvent } from "../services/EventService";

const AddEventComponent = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      title,
      startDate: new Date(startDate).toISOString(), // Convert to ISO format for backend
      endDate: new Date(endDate).toISOString(),
    };

    createEvent(event)
      .then((response) => {
        console.log("Event created:", response.data);
        navigate("/schedule"); // Redirect to calendar
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to create event: " + err.message);
      });
  };

  return (
    <div className="schedule-container">
      <h2>Add Event</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEventComponent;