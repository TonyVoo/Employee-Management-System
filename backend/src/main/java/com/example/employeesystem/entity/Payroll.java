package com.example.employeesystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "payrolls")
@Data
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private LocalDate payPeriodStart;
    private LocalDate payPeriodEnd;
    private double baseSalary;
    private double overtimePay;
    private double deductions;
    private double netPay;
}
