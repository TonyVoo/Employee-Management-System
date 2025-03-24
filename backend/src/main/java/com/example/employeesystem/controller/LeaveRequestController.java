package com.example.employeesystem.controller;

import com.example.employeesystem.entity.LeaveRequest;
import com.example.employeesystem.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<LeaveRequest> createLeaveRequest(
            @PathVariable Long employeeId, @RequestBody LeaveRequest leaveRequest) {
        return ResponseEntity.ok(leaveRequestService.createLeaveRequest(employeeId, leaveRequest));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequests(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveRequestService.getLeaveRequestsByEmployee(employeeId));
    }

    @PutMapping("/{leaveId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(
            @PathVariable Long leaveId, @RequestBody String status) {
        return ResponseEntity.ok(leaveRequestService.updateLeaveStatus(leaveId, status));
    }
}
