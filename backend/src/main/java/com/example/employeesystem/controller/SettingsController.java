package com.example.employeesystem.controller;

import com.example.employeesystem.entity.User;
import com.example.employeesystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin("*")
public class SettingsController {

    @Autowired
    private UserService userService;

    @PostMapping("/password")
    public ResponseEntity<User> updatePassword(@RequestBody PasswordUpdateRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User updatedUser = userService.updatePassword(username, request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/account")
    public ResponseEntity<User> getAccountSettings() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }
}

class PasswordUpdateRequest {
    private String oldPassword;
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}