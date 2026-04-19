
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useWeekendEvents from '../hooks/useWeekendEvents';
import EventCard from './EventCard';
import EmptyState from './EmptyState';

const WeekendWidget = ({ onEventClick }) => {
  const { weekendEvents, loading } = useWeekendEvents();

  return (
    <section className="mb-10">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/25">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
              This Weekend
            </h2>
            <p className="text-sm text-surface-500">
              Don't miss out on what's happening!
            </p>
          </div>
        </div>
        <Link
          to="/calendar"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          View Calendar
          <ArrowRight size={14} />
        </Link>
      </div>

      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700">
              <div className="h-1.5 w-full skeleton rounded mb-4" />
              <div className="w-20 h-6 rounded-lg skeleton mb-3" />
              <div className="w-3/4 h-5 rounded skeleton mb-2" />
              <div className="w-full h-3 rounded skeleton mb-4" />
              <div className="w-1/2 h-4 rounded skeleton" />
            </div>
          ))}
        </div>
      ) : weekendEvents.length === 0 ? (
        <EmptyState
          title="Free weekend ahead!"
          message="No events scheduled this weekend. Time to relax or create something new!"
          icon="🏖️"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weekendEvents.slice(0, 6).map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={onEventClick}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WeekendWidget;
