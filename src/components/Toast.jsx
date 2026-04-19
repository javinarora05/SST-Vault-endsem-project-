
import { Toaster } from 'react-hot-toast';
import useThemeStore from '../store/useThemeStore';

const Toast = () => {
  const { darkMode } = useThemeStore();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#f1f5f9' : '#0f172a',
          borderRadius: '1rem',
          padding: '12px 16px',
          fontSize: '0.875rem',
          fontFamily: 'Inter, sans-serif',
          border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
};

export default Toast;
