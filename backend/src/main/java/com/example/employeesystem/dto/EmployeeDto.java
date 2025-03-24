package com.example.employeesystem.dto;

import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String department;
    private String position;
    private String profileImage;
    private LocalDate joiningDate;
    private String performanceReview;
    private Boolean isActive;
}
