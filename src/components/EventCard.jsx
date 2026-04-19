
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Bookmark } from 'lucide-react';
import { getCategoryInfo, formatEventDate, truncateText } from '../utils/helpers';
import useAuthStore from '../store/useAuthStore';
import useRSVPStore from '../store/useRSVPStore';
import toast from 'react-hot-toast';

const EventCard = ({ event, onClick, index = 0 }) => {
  const category = getCategoryInfo(event.category);
  const { user } = useAuthStore();
  const { userRSVPs, toggleRSVP } = useRSVPStore();
  const hasRSVP = userRSVPs.includes(event.id);

  
  const handleRSVP = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please log in to RSVP');
      return;
    }
    try {
      const wasAdded = await toggleRSVP(user.uid, event.id);
      toast.success(wasAdded ? 'RSVP confirmed! 🎉' : 'RSVP cancelled');
    } catch {
      toast.error('Failed to update RSVP');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick?.(event)}
      className="group cursor-pointer bg-white dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 shadow-sm dark:shadow-none hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
    >
      
      <div className="h-1.5 w-full" style={{ backgroundColor: category.color }} />

      
      {event.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      
      <div className="p-5">
        
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              backgroundColor: category.bgLight,
              color: category.color,
            }}
          >
            <span>{category.icon}</span>
            {category.label}
          </span>

          
          {event.rsvpCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-surface-500">
              <Users size={12} />
              {event.rsvpCount}
            </span>
          )}
        </div>

        
        <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {event.title}
        </h3>

        
        {event.description && (
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-4 line-clamp-2">
            {truncateText(event.description, 120)}
          </p>
        )}

        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
            <Clock size={14} className="text-primary-500 shrink-0" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
              <MapPin size={14} className="text-primary-500 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

        
        <button
          onClick={handleRSVP}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            hasRSVP
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600'
              : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400'
          }`}
        >
          {hasRSVP ? '✓ RSVP\'d' : 'RSVP'}
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;
