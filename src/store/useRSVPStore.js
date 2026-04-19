
import { create } from 'zustand';
import { toggleRSVP as toggleRSVPService, getUserRSVPs } from '../services/rsvpService';

const useRSVPStore = create((set, get) => ({
  
  userRSVPs: [],

  
  loading: false,

  

    fetchUserRSVPs: async (userId) => {
    if (!userId) return;
    set({ loading: true });
    try {
      const rsvps = await getUserRSVPs(userId);
      set({ userRSVPs: rsvps, loading: false });
    } catch (error) {
      console.error('Failed to fetch RSVPs:', error);
      set({ loading: false });
    }
  },

    toggleRSVP: async (userId, eventId) => {
    try {
      const wasAdded = await toggleRSVPService(userId, eventId);

      set((state) => ({
        userRSVPs: wasAdded
          ? [...state.userRSVPs, eventId]       
          : state.userRSVPs.filter((id) => id !== eventId), 
      }));

      return wasAdded;
    } catch (error) {
      console.error('Failed to toggle RSVP:', error);
      throw error;
    }
  },

    hasRSVP: (eventId) => {
    return get().userRSVPs.includes(eventId);
  },

    clearRSVPs: () => set({ userRSVPs: [] }),
}));

export default useRSVPStore;
