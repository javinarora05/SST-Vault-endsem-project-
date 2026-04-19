
import { useMemo } from 'react';
import useEventStore from '../store/useEventStore';
import { isWeekend } from '../utils/helpers';

const useWeekendEvents = () => {
  const { events, loading } = useEventStore();

  
  const weekendEvents = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); 

    
    let daysUntilFriday;
    if (dayOfWeek <= 5) {
      daysUntilFriday = 5 - dayOfWeek;
    } else {
      
      daysUntilFriday = 6;
    }

    const friday = new Date(now);
    friday.setDate(now.getDate() + daysUntilFriday);
    friday.setHours(0, 0, 0, 0);

    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    sunday.setHours(23, 59, 59, 999);

    
    const startDate = isWeekend(now.toISOString()) ? now : friday;

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= sunday;
    });
  }, [events]);

  return { weekendEvents, loading };
};

export default useWeekendEvents;
