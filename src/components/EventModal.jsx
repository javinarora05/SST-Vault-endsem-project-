
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Users, Calendar, Share2, Bookmark } from 'lucide-react';
import { getCategoryInfo, formatFullDate, formatTime } from '../utils/helpers';
import useAuthStore from '../store/useAuthStore';
import useRSVPStore from '../store/useRSVPStore';
import toast from 'react-hot-toast';

const EventModal = ({ event, isOpen, onClose }) => {
  const { user } = useAuthStore();
  const { userRSVPs, toggleRSVP } = useRSVPStore();
  const hasRSVP = event ? userRSVPs.includes(event.id) : false;
  const category = event ? getCategoryInfo(event.category) : null;

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle RSVP
  const handleRSVP = async () => {
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

  
  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Check out this event: ${event.title}`,
      url: window.location.origin + `/event/${event.id}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard!');
      }
    } catch {
      
    }
  };

  return (
    <AnimatePresence>
      {isOpen && event && (
        <>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[90vh] bg-white dark:bg-surface-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            
            <div
              className="relative h-32 sm:h-40 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${category.color}dd, ${category.color}88)`,
              }}
            >
              
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                />
              )}

              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              
              <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium">
                <span>{category.icon}</span>
                {category.label}
              </span>
            </div>

            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                {event.title}
              </h2>

              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                  <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30">
                    <Calendar size={16} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                      {formatFullDate(event.date)}
                    </p>
                    <p className="text-xs text-surface-500">{formatTime(event.date)}</p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                    <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30">
                      <MapPin size={16} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                        {event.location}
                      </p>
                      <p className="text-xs text-surface-500">Location</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                  <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30">
                    <Users size={16} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                      {event.rsvpCount || 0} attending
                    </p>
                    <p className="text-xs text-surface-500">RSVPs</p>
                  </div>
                </div>
              </div>

              
              {event.description && (
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    About this event
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              )}
            </div>

            
            <div className="border-t border-surface-200 dark:border-surface-700 p-4 flex items-center gap-3">
              <button
                onClick={handleRSVP}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  hasRSVP
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600'
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                }`}
              >
                {hasRSVP ? '✓ RSVP&apos;d' : 'RSVP Now'}
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                aria-label="Share event"
              >
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
