
import { useMemo, useEffect } from 'react';
import useEventStore from '../store/useEventStore';
import useFilterStore from '../store/useFilterStore';

const useEvents = () => {
  const { events, loading, error, fetchEvents } = useEventStore();
  const { activeFilters, searchQuery } = useFilterStore();

  
  useEffect(() => {
    fetchEvents();
  }, []); 

  
  const filteredEvents = useMemo(() => {
    let result = [...events];

    
    if (activeFilters.length > 0) {
      result = result.filter((event) => activeFilters.includes(event.category));
    }

    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (event) =>
          event.title?.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.location?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [events, activeFilters, searchQuery]);

  return {
    events: filteredEvents,
    allEvents: events,
    loading,
    error,
    refetch: fetchEvents,
  };
};

export default useEvents;
