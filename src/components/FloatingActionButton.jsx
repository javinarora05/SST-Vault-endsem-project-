
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import useEventStore from '../store/useEventStore';
import EventForm from './EventForm';
import toast from 'react-hot-toast';

const FloatingActionButton = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { isAdmin } = useAuthStore();
  const { addEvent } = useEventStore();

  
  if (!isAdmin) return null;

  const handleCreateEvent = async (eventData) => {
    try {
      await addEvent(eventData);
      toast.success('Event created successfully! 🎉');
    } catch (error) {
      toast.error('Failed to create event');
      throw error;
    }
  };

  return (
    <>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setFormOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 flex items-center justify-center transition-shadow"
        aria-label="Create new event"
      >
        <Plus size={24} />
      </motion.button>

      
      <EventForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </>
  );
};

export default FloatingActionButton;
