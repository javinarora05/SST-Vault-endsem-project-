
import { format, isToday, isTomorrow, isThisWeek, isFriday, isSaturday, isSunday, parseISO } from 'date-fns';
import { CATEGORIES } from './constants';

export const formatEventDate = (dateStr) => {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, "EEE, MMM d · h:mm a");
};

export const formatFullDate = (dateStr) => {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'MMMM d, yyyy');
};

export const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'h:mm a');
};

export const getRelativeDate = (dateStr) => {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;

  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isThisWeek(date)) return format(date, 'EEEE'); 
  return format(date, 'MMM d');
};

export const isWeekend = (dateStr) => {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return isFriday(date) || isSaturday(date) || isSunday(date);
};

export const getCategoryInfo = (categoryId) => {
  return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
};

export const getCategoryColor = (categoryId) => {
  return getCategoryInfo(categoryId).color;
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Truncate text to a max length with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
};
