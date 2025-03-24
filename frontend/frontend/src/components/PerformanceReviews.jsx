import React, { useState } from "react";
import { addPerformanceReview } from "../services/EmployeeService";
import "../styles/PerformanceReviews.css"

const PerformanceReviews = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPerformanceReview(employeeId, review);
      setMessage(`Review added for ${response.data.firstName}`);
      setEmployeeId("");
      setReview("");
    } catch (error) {
      setMessage("Error adding review: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="performance-reviews-container">
      <div className="performance-reviews-card">
      <h2>Add Performance Review</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default PerformanceReviews;