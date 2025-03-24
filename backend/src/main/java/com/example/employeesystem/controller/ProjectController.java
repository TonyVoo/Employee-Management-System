package com.example.employeesystem.controller;

import com.example.employeesystem.dto.EmployeeDto;
import com.example.employeesystem.dto.ProjectDto;
import com.example.employeesystem.entity.Project;
import com.example.employeesystem.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok(projectService.createProject(projectDto));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable("id") Long projectId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProjectDto> updateEmployee(@PathVariable("id") Long projectId, @RequestBody ProjectDto updatedProject) {
        ProjectDto projectDto = projectService.updateProject(projectId, updatedProject);
        return ResponseEntity.ok(projectDto);
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getProjectAnalytics() {
        List<ProjectDto> projects = projectService.getAllProjects();
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalProjects", projectService.getAllProjects().size());
        analytics.put("totalProjects", projects.size());
        analytics.put("completedProjects", projects.stream().filter(p -> "COMPLETED".equals(p.getStatus())).count());
        analytics.put("inProgressProjects", projects.stream().filter(p -> "IN_PROGRESS".equals(p.getStatus())).count());
        analytics.put("notStartedProjects", projects.stream().filter(p -> "NOT_STARTED".equals(p.getStatus())).count());
        return ResponseEntity.ok(analytics);
    }
}
