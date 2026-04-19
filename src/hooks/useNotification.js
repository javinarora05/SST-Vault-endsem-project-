
import { useCallback } from 'react';

const useNotification = () => {
    const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }, []);

    const sendNotification = useCallback((title, options = {}) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    new Notification(title, {
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      ...options,
    });
  }, []);

    const scheduleNotification = useCallback((title, options, date) => {
    const now = new Date();
    const delay = date.getTime() - now.getTime();

    if (delay <= 0) return; 

    
    const timeoutId = setTimeout(() => {
      sendNotification(title, options);
    }, delay);

    return timeoutId;
  }, [sendNotification]);

  return {
    requestPermission,
    sendNotification,
    scheduleNotification,
    isSupported: 'Notification' in window,
    permission: typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default',
  };
};

export default useNotification;
