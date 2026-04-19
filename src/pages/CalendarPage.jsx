
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import useEvents from '../hooks/useEvents';
import CalendarView from '../components/CalendarView';
import EventModal from '../components/EventModal';
import FilterChips from '../components/FilterChips';
import LoadingSkeleton from '../components/LoadingSkeleton';

const CalendarPage = () => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
            <Calendar size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
              Calendar
            </h1>
            <p className="text-sm text-surface-500">
              View all events at a glance
            </p>
          </div>
        </div>
      </div>

      
      <div className="mb-6">
        <FilterChips />
      </div>

      
      {loading ? (
        <LoadingSkeleton variant="calendar" />
      ) : (
        <CalendarView
          events={events}
          onEventClick={setSelectedEvent}
        />
      )}

      
      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default CalendarPage;
