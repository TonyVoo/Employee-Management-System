package com.example.employeesystem.service.impl;

import com.example.employeesystem.dto.ProjectDto;
import com.example.employeesystem.entity.Project;
import com.example.employeesystem.exception.ResourceNotFoundException;
import com.example.employeesystem.mapper.ProjectMapper;
import com.example.employeesystem.repository.ProjectRepository;
import com.example.employeesystem.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;

    @Override
    public List<ProjectDto> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map((project) -> ProjectMapper.mapToProjectDto(project))
                .collect((Collectors.toList()));
    }

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = ProjectMapper.maptoProject(projectDto);
        Project savedProject = projectRepository.save(project);
        return ProjectMapper.mapToProjectDto(savedProject);
    }

    @Override
    public ProjectDto getProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project is not exists with given id:" + projectId));
        return ProjectMapper.mapToProjectDto(project);
    }

    @Override
    public ProjectDto updateProject(Long projectId, ProjectDto updatedProject) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id:" + projectId)
                );
        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());
        project.setStartDate(updatedProject.getStartDate());
        project.setEndDate(updatedProject.getEndDate());
        project.setStatus(updatedProject.getStatus());

        Project updatedProjectObj = projectRepository.save(project);

        return ProjectMapper.mapToProjectDto(updatedProjectObj);
    }
}
