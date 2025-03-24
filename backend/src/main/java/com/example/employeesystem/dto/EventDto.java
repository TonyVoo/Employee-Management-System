package com.example.employeesystem.dto;

import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class EventDto {
    private Long id;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
}
