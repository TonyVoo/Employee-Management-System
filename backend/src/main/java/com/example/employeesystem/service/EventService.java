package com.example.employeesystem.service;

import com.example.employeesystem.dto.EventDto;
import com.example.employeesystem.repository.EventRepository;

import java.util.List;

public interface EventService {
    List<EventDto> getAllEvents();

    EventDto createEvent(EventDto eventDto);

}
