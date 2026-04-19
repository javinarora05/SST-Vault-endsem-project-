
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Zap, TrendingUp } from 'lucide-react';
import useEvents from '../hooks/useEvents';
import useAuthStore from '../store/useAuthStore';
import useRSVPStore from '../store/useRSVPStore';
import WeekendWidget from '../components/WeekendWidget';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import FilterChips from '../components/FilterChips';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

const HomePage = () => {
  const { events, allEvents, loading } = useEvents();
  const { user } = useAuthStore();
  const { userRSVPs } = useRSVPStore();
  const [selectedEvent, setSelectedEvent] = useState(null);

  
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  
  const totalEvents = allEvents.length;
  const myRSVPs = userRSVPs.length;
  const upcomingCount = allEvents.filter(
    (e) => new Date(e.date) >= new Date()
  ).length;

  return (
    <div className="animate-fade-in">
      
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-8 sm:p-10 text-white"
        >
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {greeting}
              {user ? `, ${user.displayName?.split(' ')[0]}` : ''} 👋
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              Stay updated with everything happening on campus. Never miss an event, deadline, or activity again.
            </p>

            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-xl backdrop-blur-sm">
                <Calendar size={16} />
                <span className="text-sm font-medium">{upcomingCount} upcoming</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-xl backdrop-blur-sm">
                <Users size={16} />
                <span className="text-sm font-medium">{myRSVPs} RSVPs</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-xl backdrop-blur-sm">
                <Zap size={16} />
                <span className="text-sm font-medium">{totalEvents} total events</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      
      <WeekendWidget onEventClick={setSelectedEvent} />

      
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                All Events
              </h2>
              <p className="text-sm text-surface-500">
                {events.length} event{events.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>

        
        <div className="mb-6">
          <FilterChips />
        </div>

        
        {loading ? (
          <LoadingSkeleton variant="cards" count={6} />
        ) : events.length === 0 ? (
          <EmptyState
            title="No events found"
            message="Try adjusting your filters or check back later for new events."
            icon="🔍"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={setSelectedEvent}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      
      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default HomePage;
