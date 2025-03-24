package com.example.employeesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Settings {
    @Id
    private String userId;
    private String companyName;
    private String currency;
    private int defaultWorkHours;
}
