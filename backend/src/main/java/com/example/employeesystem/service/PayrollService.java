package com.example.employeesystem.service;

import com.example.employeesystem.entity.Attendance;
import com.example.employeesystem.entity.Employee;
import com.example.employeesystem.entity.Payroll;
import com.example.employeesystem.repository.AttendanceRepository;
import com.example.employeesystem.repository.EmployeeRepository;
import com.example.employeesystem.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Payroll generatePayroll(Long employeeId, LocalDate startDate, LocalDate endDate) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Simple payroll calculation (example logic)
        double baseSalary = 5000.00; // Assume a fixed base salary; replace with real data
        List<Attendance> attendances = attendanceRepository.findAll(); // Filter by employee and date in production
        double overtimePay = calculateOvertimePay(attendances, startDate, endDate);
        double deductions = 200.00; // Example fixed deduction
        double netPay = baseSalary + overtimePay - deductions;

        Payroll payroll = new Payroll();
        payroll.setEmployee(employee);
        payroll.setPayPeriodStart(startDate);
        payroll.setPayPeriodEnd(endDate);
        payroll.setBaseSalary(baseSalary);
        payroll.setOvertimePay(overtimePay);
        payroll.setDeductions(deductions);
        payroll.setNetPay(netPay);

        return payrollRepository.save(payroll);
    }

    public List<Payroll> getPayslipsByEmployee(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }

    private double calculateOvertimePay(List<Attendance> attendances, LocalDate startDate, LocalDate endDate) {
        double overtimeHours = 0;
        for (Attendance attendance : attendances) {
            if (attendance.getClockIn() != null && attendance.getClockOut() != null &&
                    attendance.getClockIn().toLocalDate().isAfter(startDate.minusDays(1)) &&
                    attendance.getClockOut().toLocalDate().isBefore(endDate.plusDays(1))) {
                long hours = ChronoUnit.HOURS.between(attendance.getClockIn(), attendance.getClockOut());
                if (hours > 8) { // Assume 8-hour standard workday
                    overtimeHours += (hours - 8);
                }
            }
        }
        return overtimeHours * 20.00; // Example overtime rate: $20/hour
    }
}