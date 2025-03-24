package com.example.employeesystem.controller;

import com.example.employeesystem.entity.Payroll;
import com.example.employeesystem.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:3000")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @PostMapping("/generate/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payroll> generatePayroll(
            @PathVariable Long employeeId,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {
        LocalDate payPeriodStart = LocalDate.parse(startDate);
        LocalDate payPeriodEnd = LocalDate.parse(endDate);
        return ResponseEntity.ok(payrollService.generatePayroll(employeeId, payPeriodStart, payPeriodEnd));
    }

    @GetMapping("/payslips/{employeeId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Payroll>> getPayslips(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayslipsByEmployee(employeeId));
    }
}
