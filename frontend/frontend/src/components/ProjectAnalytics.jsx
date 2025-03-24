import React, { useState, useEffect } from "react";
import "../styles/ProjectComponent.css";
import { getAnalytics } from "../services/ProjectService";

const ProjectAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = () => {
    setLoading(true);
    getAnalytics()
      .then((response) => {
        setAnalytics(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch analytics: " + err.message);
        setLoading(false);
      });
  };

  return (
    <div className="project-container">
      <h2>Project Analytics</h2>
      {loading && <p>Loading analytics...</p>}
      {error && <p className="error">{error}</p>}
      {analytics && !loading && (
        <div className="analytics">
          <h3>Analytics Overview</h3>
          <div className="analytics-grid">
            <div className="analytics-item">
              <strong>Total Projects:</strong> {analytics.totalProjects || 0}
            </div>
            <div className="analytics-item">
              <strong>Completed Projects:</strong> {analytics.completedProjects || "N/A"}
            </div>
            <div className="analytics-item">
              <strong>In Progress Projects:</strong> {analytics.inProgressProjects || "N/A"}
            </div>
            <div className="analytics-item">
              <strong>Not Started Projects:</strong> {analytics.notStartedProjects || "N/A"}
            </div>
            {/* Add more metrics as your backend supports them */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAnalytics;