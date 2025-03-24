import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectComponent.css";
import { listProjects, updateProject } from "../services/ProjectService";

const ListProjectComponent = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); // Filtered list for display
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setLoading(true);
    listProjects()
      .then((response) => {
        console.log("Fetched projects:", response.data);
        setProjects(response.data);
        setFilteredProjects(response.data); // Initialize filtered list
        const initialStatuses = response.data.reduce((acc, project) => {
          acc[project.id] = project.status;
          return acc;
        }, {});
        setStatusUpdates(initialStatuses);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch projects: " + err.message);
        setLoading(false);
      });
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        (project.description && project.description.toLowerCase().includes(term))
    );
    setFilteredProjects(filtered);
  };

  const handleStatusChange = (projectId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [projectId]: newStatus,
    }));
  };

  const handleUpdateStatus = (projectId) => {
    if (!projectId || projectId === "undefined") {
      setError("Invalid project ID");
      return;
    }

    setLoading(true);
    const projectToUpdate = projects.find((p) => p.id === projectId);
    if (!projectToUpdate) {
      setError("Project not found");
      setLoading(false);
      return;
    }

    const updatedProject = { ...projectToUpdate, status: statusUpdates[projectId] };

    updateProject(projectId, updatedProject)
      .then((response) => {
        setProjects((prevProjects) =>
          prevProjects.map((p) => (p.id === projectId ? response.data : p))
        );
        setFilteredProjects((prevFiltered) =>
          prevFiltered.map((p) => (p.id === projectId ? response.data : p))
        ); // Update filtered list too
        setLoading(false);
        setError(null);
        alert(`Status for project ${projectId} updated successfully!`);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update project status: " + err.message);
        setLoading(false);
      });
  };

  return (
    <div className="project-container">
      <h2>All Projects</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading && <p>Loading projects...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && filteredProjects.length === 0 && <p>No projects found.</p>}
      {!loading && filteredProjects.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <select
                    value={statusUpdates[project.id] || project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                  >
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="NOT_STARTED">Not Started</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(project.id)}
                    disabled={loading || statusUpdates[project.id] === project.status}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListProjectComponent;