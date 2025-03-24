package com.example.employeesystem.mapper;

import com.example.employeesystem.dto.EventDto;
import com.example.employeesystem.entity.Event;

public class EventMapper {
    public static EventDto mapToEventDto(Event event) {
        return new EventDto(
                event.getId(),
                event.getTitle(),
                event.getStartDate(),
                event.getEndDate()
        );
    }

    public static Event mapToEvent(EventDto eventDto) {
        return new Event(
                eventDto.getId(),
                eventDto.getTitle(),
                eventDto.getStartDate(),
                eventDto.getEndDate()
        );
    }
}
