package com.example.employeesystem.service;

import com.example.employeesystem.entity.Attendance;
import com.example.employeesystem.entity.Employee;
import com.example.employeesystem.repository.AttendanceRepository;
import com.example.employeesystem.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Attendance clockIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setClockIn(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    public Attendance clockOut(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));
        attendance.setClockOut(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }
}
