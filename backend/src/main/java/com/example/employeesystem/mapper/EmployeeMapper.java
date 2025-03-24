package com.example.employeesystem.mapper;

import com.example.employeesystem.dto.EmployeeDto;
import com.example.employeesystem.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhoneNumber(),
                employee.getDateOfBirth(),
                employee.getAddress(),
                employee.getDepartment(),
                employee.getPosition(),
                employee.getProfileImage(),
                employee.getJoiningDate(),
                employee.getPerformanceReview(),
                employee.getIsActive()
        );
    }

    public static Employee maptoEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                employeeDto.getPhoneNumber(),
                employeeDto.getDateOfBirth(),
                employeeDto.getAddress(),
                employeeDto.getDepartment(),
                employeeDto.getPosition(),
                employeeDto.getProfileImage(),
                employeeDto.getJoiningDate(),
                employeeDto.getPerformanceReview(),
                employeeDto.getIsActive()
        );
    }
}
