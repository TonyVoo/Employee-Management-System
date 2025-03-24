package com.example.employeesystem.service;

import com.example.employeesystem.entity.Settings;
import com.example.employeesystem.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    public Settings getSettings(String userId) {
        return settingsRepository.findById(userId)
                .orElse(new Settings()); // Return default settings if none exist
    }

    public Settings saveSettings(Settings settings) {
        return settingsRepository.save(settings);
    }
}
