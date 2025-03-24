import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "../styles/ScheduleComponent.css";
import { listEvents } from "../services/EventService";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

const ScheduleComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date(2025, 2, 1));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await listEvents();
      console.log("API Response:", response); // Log the response
      const eventData = Array.isArray(response.data) ? response.data : [];
      console.log("Event Data:", eventData); // Log the event data
      const calendarEvents = eventData.map((event) => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error("Invalid date for event:", event);
        }
        return {
          title: event.title,
          start: startDate,
          end: endDate,
          allDay: event.allDay || false,
          resource: event,
        };
      });
      console.log("Calendar Events:", calendarEvents); // Log the transformed events
      setEvents(calendarEvents);
      setError(null);
    } catch (err) {
      console.error("Error in fetchEvents:", err);
      setError("Failed to fetch events: " + err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Schedule</h2>
      </div>
      <div className="schedule-content">
        {loading && <p className="loading-text">Loading schedule...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="no-events">No events available.</p>
        )}
        {!loading && !error && events.length > 0 && (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={handleViewChange}
            date={date}
            onNavigate={handleNavigate}
            className="schedule-calendar"
            onSelectEvent={(event) =>
              alert(`Event: ${event.title}\nFrom: ${event.start}\nTo: ${event.end}`)
            }
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleComponent;