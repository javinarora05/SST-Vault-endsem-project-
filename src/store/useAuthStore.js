
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  
  user: null,

  
  profile: null,

  
  loading: true,

  
  isAdmin: false,

  

    setUser: (user) =>
    set({
      user,
      loading: false,
    }),

    setProfile: (profile) =>
    set({
      profile,
      isAdmin: profile?.role === 'admin',
    }),

    clearUser: () =>
    set({
      user: null,
      profile: null,
      loading: false,
      isAdmin: false,
    }),

    setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;
