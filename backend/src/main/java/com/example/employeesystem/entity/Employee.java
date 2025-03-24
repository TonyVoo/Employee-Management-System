package com.example.employeesystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "address")
    private String address;

    @Column(name = "department")
    private String department;

    @Column(name = "position")
    private String position;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "performanceReview")
    private String performanceReview;

    @Column(name = "isActive")
    private Boolean isActive;

}
