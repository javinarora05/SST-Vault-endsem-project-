
import { useMemo, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getCategoryColor } from '../utils/helpers';

const CalendarView = ({ events = [], onEventClick, onDateClick }) => {
  
  
  const calendarEvents = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.date,
      backgroundColor: getCategoryColor(event.category),
      borderColor: getCategoryColor(event.category),
      extendedProps: {
        ...event, 
      },
    }));
  }, [events]);

  
  const handleEventClick = useCallback(
    (info) => {
      const eventData = info.event.extendedProps;
      onEventClick?.({
        id: info.event.id,
        title: info.event.title,
        ...eventData,
      });
    },
    [onEventClick]
  );

  
  const handleDateClick = useCallback(
    (info) => {
      onDateClick?.(info.dateStr);
    },
    [onDateClick]
  );

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 border border-surface-200 dark:border-surface-700 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={calendarEvents}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        editable={false}
        selectable={true}
        dayMaxEvents={3}           
        weekends={true}
        height="auto"
        eventDisplay="block"
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
        }}
        
        windowResize={(arg) => {
          if (window.innerWidth < 640) {
            arg.view.calendar.changeView('timeGridDay');
          }
        }}
      />
    </div>
  );
};

export default CalendarView;
