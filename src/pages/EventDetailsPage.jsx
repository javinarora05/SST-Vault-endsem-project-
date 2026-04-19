
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Users, Calendar, Share2 } from 'lucide-react';
import { getEventById } from '../services/eventService';
import useAuthStore from '../store/useAuthStore';
import useRSVPStore from '../store/useRSVPStore';
import { getCategoryInfo, formatFullDate, formatTime } from '../utils/helpers';
import LoadingSkeleton from '../components/LoadingSkeleton';
import toast from 'react-hot-toast';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { userRSVPs, toggleRSVP } = useRSVPStore();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasRSVP = event ? userRSVPs.includes(event.id) : false;
  const category = event ? getCategoryInfo(event.category) : null;

  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  
  const handleRSVP = async () => {
    if (!user) {
      toast.error('Please log in to RSVP');
      navigate('/login');
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
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: `Check out: ${event.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied!');
      }
    } catch {
      
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <LoadingSkeleton variant="list" count={5} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">
          Event Not Found
        </h2>
        <p className="text-surface-500 mb-6">
          This event may have been removed or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      
      <div
        className="relative rounded-3xl overflow-hidden p-8 sm:p-10 mb-8"
        style={{
          background: `linear-gradient(135deg, ${category.color}dd, ${category.color}88)`,
        }}
      >
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
          />
        )}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium mb-4">
            <span>{category.icon}</span>
            {category.label}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80 mt-4">
            <span className="flex items-center gap-1.5">
              <Users size={16} />
              {event.rsvpCount || 0} attending
            </span>
          </div>
        </div>
      </div>

      
      <div className="bg-white dark:bg-surface-800 rounded-3xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        
        <div className="p-6 sm:p-8 space-y-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-900/30">
              <Calendar size={20} className="text-primary-500" />
            </div>
            <div>
              <p className="font-semibold text-surface-900 dark:text-surface-100">
                {formatFullDate(event.date)}
              </p>
              <p className="text-sm text-surface-500">{formatTime(event.date)}</p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-900/30">
                <MapPin size={20} className="text-primary-500" />
              </div>
              <div>
                <p className="font-semibold text-surface-900 dark:text-surface-100">
                  {event.location}
                </p>
                <p className="text-sm text-surface-500">Location</p>
              </div>
            </div>
          )}
        </div>

        
        {event.description && (
          <div className="p-6 sm:p-8 border-b border-surface-200 dark:border-surface-700">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
              About this event
            </h2>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}

        
        <div className="p-6 sm:p-8 flex items-center gap-3">
          <button
            onClick={handleRSVP}
            className={`flex-1 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
              hasRSVP
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
            }`}
          >
            {hasRSVP ? '✓ RSVP&apos;d' : 'RSVP Now'}
          </button>
          <button
            onClick={handleShare}
            className="p-3.5 rounded-xl bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Share event"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetailsPage;
