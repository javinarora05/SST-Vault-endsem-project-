
import { create } from 'zustand';

const useFilterStore = create((set) => ({
  
  activeFilters: [],

  
  searchQuery: '',

  // --- Actions ---

  /** Toggle a category filter on/off */
  toggleFilter: (category) =>
    set((state) => {
      const isActive = state.activeFilters.includes(category);
      return {
        activeFilters: isActive
          ? state.activeFilters.filter((f) => f !== category) // Remove it
          : [...state.activeFilters, category],                // Add it
      };
    }),

  /** Set the search query */
  setSearchQuery: (query) => set({ searchQuery: query }),

  /** Clear all filters and search */
  clearFilters: () => set({ activeFilters: [], searchQuery: '' }),
}));

export default useFilterStore;
