package com.example.employeesystem.service.impl;

import com.example.employeesystem.dto.EventDto;
import com.example.employeesystem.entity.Event;
import com.example.employeesystem.mapper.EventMapper;
import com.example.employeesystem.repository.EventRepository;
import com.example.employeesystem.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;

    @Override
    public EventDto createEvent(EventDto eventDto) {
        Event event = EventMapper.mapToEvent(eventDto);
        Event savedEvent = eventRepository.save(event);
        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map((event) -> EventMapper.mapToEventDto(event))
                .collect((Collectors.toList()));
    }
}
