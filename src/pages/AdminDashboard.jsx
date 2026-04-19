
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, LayoutDashboard, Calendar, Users, Zap } from 'lucide-react';
import useEventStore from '../store/useEventStore';
import useEvents from '../hooks/useEvents';
import EventForm from '../components/EventForm';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getCategoryInfo, formatEventDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { allEvents, loading } = useEvents();
  const { addEvent, editEvent, removeEvent } = useEventStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  
  const totalEvents = allEvents.length;
  const upcomingEvents = allEvents.filter((e) => new Date(e.date) >= new Date()).length;
  const totalRSVPs = allEvents.reduce((sum, e) => sum + (e.rsvpCount || 0), 0);

  
  const handleCreate = useCallback(async (eventData) => {
    try {
      await addEvent(eventData);
      toast.success('Event created! 🎉');
    } catch {
      toast.error('Failed to create event');
    }
  }, [addEvent]);

  
  const handleEdit = useCallback(async (eventData) => {
    try {
      await editEvent(editingEvent.id, eventData);
      toast.success('Event updated!');
      setEditingEvent(null);
    } catch {
      toast.error('Failed to update event');
    }
  }, [editEvent, editingEvent]);

  
  const handleDelete = useCallback(async (eventId, eventTitle) => {
    if (!window.confirm(`Delete "${eventTitle}"? This can't be undone.`)) return;
    try {
      await removeEvent(eventId);
      toast.success('Event deleted');
    } catch {
      toast.error('Failed to delete event');
    }
  }, [removeEvent]);

  return (
    <div className="animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
              Admin Dashboard
            </h1>
            <p className="text-sm text-surface-500">Manage campus events</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditingEvent(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
        >
          <Plus size={18} />
          Create Event
        </motion.button>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
              <Calendar size={18} className="text-blue-500" />
            </div>
            <span className="text-sm font-medium text-surface-500">Total Events</span>
          </div>
          <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
            {totalEvents}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
              <Zap size={18} className="text-emerald-500" />
            </div>
            <span className="text-sm font-medium text-surface-500">Upcoming</span>
          </div>
          <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
            {upcomingEvents}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-900/30">
              <Users size={18} className="text-violet-500" />
            </div>
            <span className="text-sm font-medium text-surface-500">Total RSVPs</span>
          </div>
          <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
            {totalRSVPs}
          </p>
        </div>
      </div>

      
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="p-5 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            All Events ({totalEvents})
          </h2>
        </div>

        {loading ? (
          <div className="p-5">
            <LoadingSkeleton variant="list" count={5} />
          </div>
        ) : allEvents.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-surface-500">No events yet. Create your first one!</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-200 dark:divide-surface-700">
            {allEvents.map((event) => {
              const cat = getCategoryInfo(event.category);
              const isPast = new Date(event.date) < new Date();

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex items-center gap-4 p-4 sm:p-5 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors ${isPast ? 'opacity-60' : ''}`}
                >
                  
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />

                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-surface-900 dark:text-surface-100 truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-surface-500">
                      <span>{formatEventDate(event.date)}</span>
                      {event.location && (
                        <>
                          <span>·</span>
                          <span className="truncate">{event.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  
                  <div className="hidden sm:flex items-center gap-1 text-sm text-surface-500">
                    <Users size={14} />
                    <span>{event.rsvpCount || 0}</span>
                  </div>

                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { setEditingEvent(event); setFormOpen(true); }}
                      className="p-2 rounded-lg text-surface-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                      aria-label="Edit event"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
                      className="p-2 rounded-lg text-surface-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      aria-label="Delete event"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      
      <EventForm
        isOpen={formOpen}
        event={editingEvent}
        onClose={() => { setFormOpen(false); setEditingEvent(null); }}
        onSubmit={editingEvent ? handleEdit : handleCreate}
      />
    </div>
  );
};

export default AdminDashboard;
