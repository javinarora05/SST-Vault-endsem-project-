

export const CATEGORIES = [
  {
    id: 'clubs',
    label: 'Clubs',
    color: '#8b5cf6',       
    bgLight: '#f5f3ff',
    bgDark: 'rgba(139, 92, 246, 0.15)',
    icon: '🎭',
  },
  {
    id: 'academics',
    label: 'Academics',
    color: '#3b82f6',       
    bgLight: '#eff6ff',
    bgDark: 'rgba(59, 130, 246, 0.15)',
    icon: '📚',
  },
  {
    id: 'placements',
    label: 'Placements',
    color: '#10b981',       
    bgLight: '#ecfdf5',
    bgDark: 'rgba(16, 185, 129, 0.15)',
    icon: '💼',
  },
  {
    id: 'fun',
    label: 'Fun / Social',
    color: '#f59e0b',       
    bgLight: '#fffbeb',
    bgDark: 'rgba(245, 158, 11, 0.15)',
    icon: '🎉',
  },
];


export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};


export const NAV_LINKS = [
  { path: '/', label: 'Home', icon: 'Home' },
  { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
];


export const ADMIN_NAV_LINKS = [
  { path: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
];


export const DEFAULT_EVENT = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'clubs',
  imageUrl: '',
};
