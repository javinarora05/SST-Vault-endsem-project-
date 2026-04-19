
import { useState, useCallback } from 'react';
import { X, Upload, Calendar, MapPin, Tag, FileText, Type } from 'lucide-react';
import { CATEGORIES, DEFAULT_EVENT } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

const EventForm = ({ event = null, onSubmit, onClose, isOpen }) => {
  
  const [formData, setFormData] = useState(
    event
      ? {
          title: event.title || '',
          description: event.description || '',
          date: event.date ? event.date.split('T')[0] : '',
          time: event.date ? event.date.split('T')[1]?.slice(0, 5) || '' : '',
          location: event.location || '',
          category: event.category || 'clubs',
          imageUrl: event.imageUrl || '',
        }
      : { ...DEFAULT_EVENT }
  );

  const [loading, setLoading] = useState(false);

  // Handle input changes — controlled form pattern
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time into ISO string for Firestore
      const dateTime = formData.time
        ? `${formData.date}T${formData.time}:00`
        : `${formData.date}T00:00:00`;

      await onSubmit({
        title: formData.title,
        description: formData.description,
        date: dateTime,
        location: formData.location,
        category: formData.category,
        imageUrl: formData.imageUrl,
      });

      // Reset form after successful submit
      setFormData({ ...DEFAULT_EVENT });
      onClose?.();
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[90vh] bg-white dark:bg-surface-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                {event ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  <Type size={14} />
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Hackathon 2026"
                  className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                />
              </div>

              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  <FileText size={14} />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell people about this event..."
                  className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors resize-none"
                />
              </div>

              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    <Calendar size={14} />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    🕐 Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  <MapPin size={14} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Auditorium, Room 301"
                  className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                />
              </div>

              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  <Tag size={14} />
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat.id }))}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        formData.category === cat.id
                          ? 'text-white shadow-md'
                          : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700'
                      }`}
                      style={
                        formData.category === cat.id
                          ? { backgroundColor: cat.color, borderColor: cat.color }
                          : {}
                      }
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  <Upload size={14} />
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                />
              </div>
            </form>

            
            <div className="border-t border-surface-200 dark:border-surface-700 p-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.title || !formData.date}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventForm;
