package com.example.employeesystem.mapper;

import com.example.employeesystem.dto.ProjectDto;
import com.example.employeesystem.entity.Project;

public class ProjectMapper {

    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStartDate(),
                project.getEndDate(),
                project.getStatus()
        );
    }

    public static Project maptoProject(ProjectDto projectDto) {
        return new Project(
                projectDto.getId(),
                projectDto.getName(),
                projectDto.getDescription(),
                projectDto.getStartDate(),
                projectDto.getEndDate(),
                projectDto.getStatus()
        );
    }
}
