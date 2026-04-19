
import { create } from 'zustand';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';

const useEventStore = create((set, get) => ({
  
  events: [],

  
  selectedEvent: null,

  
  loading: false,

  
  error: null,

  

    fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const events = await getEvents();
      set({ events, loading: false });
    } catch (error) {
      console.error('Failed to fetch events:', error);
      set({ error: error.message, loading: false });
    }
  },

    addEvent: async (eventData) => {
    try {
      const id = await createEvent(eventData);
      
      await get().fetchEvents();
      return id;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  },

    editEvent: async (eventId, updates) => {
    try {
      await updateEvent(eventId, updates);
      await get().fetchEvents();
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  },

    removeEvent: async (eventId) => {
    try {
      await deleteEvent(eventId);
      
      set((state) => ({
        events: state.events.filter((e) => e.id !== eventId),
      }));
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw error;
    }
  },

    setSelectedEvent: (event) => set({ selectedEvent: event }),

    clearSelectedEvent: () => set({ selectedEvent: null }),
}));

export default useEventStore;
