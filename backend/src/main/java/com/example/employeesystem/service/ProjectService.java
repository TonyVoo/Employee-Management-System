package com.example.employeesystem.service;

import com.example.employeesystem.dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    ProjectDto createProject(ProjectDto projectDto);

    ProjectDto getProjectById(Long projectId);

    List<ProjectDto> getAllProjects();

    ProjectDto updateProject(Long projectId, ProjectDto updatedProject);
}
