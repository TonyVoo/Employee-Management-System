import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectComponent.css";
import { createProject } from "../services/ProjectService";

const ProjectComponent = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "IN_PROGRESS",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = {};

    if (!newProject.name.trim()) {
      errorsCopy.name = "Project Name is required";
      valid = false;
    }
    if (!newProject.description.trim()) {
      errorsCopy.description = "Description is required";
      valid = false;
    }
    if (!newProject.startDate.trim()) {
      errorsCopy.startDate = "Start Date is required";
      valid = false;
    }
    if (!newProject.endDate.trim()) {
      errorsCopy.endDate = "End Date is required";
      valid = false;
    }
    if (!newProject.status.trim()) {
      errorsCopy.status = "Status is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleCreateProject = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const project = { ...newProject };
      console.log("Creating project:", project);

      createProject(project)
        .then((response) => {
          console.log("Project created:", response.data);
          setNewProject({
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            status: "IN_PROGRESS",
          });
          setErrors({});
          setError(null);
          navigate("/projects"); // Redirect to project list after creation
        })
        .catch((err) => {
          console.error("Error creating project:", err);
          setError("Failed to create project: " + err.message);
        });
    }
  };

  return (
    <div className="project-container">
      <h2>Create New Project</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleCreateProject}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={newProject.startDate}
            onChange={handleInputChange}
            required
          />
          {errors.startDate && (
            <span className="error">{errors.startDate}</span>
          )}
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={newProject.endDate}
            onChange={handleInputChange}
            required
          />
          {errors.endDate && <span className="error">{errors.endDate}</span>}
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={newProject.status}
            onChange={handleInputChange}
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="NOT_STARTED">Not Started</option>
          </select>
          {errors.status && <span className="error">{errors.status}</span>}
        </div>
        <button type="submit" className="submit-btn">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectComponent;