
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, LayoutDashboard, Filter } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useEventStore from '../store/useEventStore';
import { NAV_LINKS, ADMIN_NAV_LINKS, CATEGORIES } from '../utils/constants';
import useFilterStore from '../store/useFilterStore';
import { formatEventDate, getCategoryInfo } from '../utils/helpers';


const iconMap = {
  Home,
  Calendar,
  LayoutDashboard,
};

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin } = useAuthStore();
  const { events } = useEventStore();
  const { activeFilters, toggleFilter } = useFilterStore();

  const isActive = (path) => location.pathname === path;

  
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .slice(0, 5);

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 space-y-6">
        
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm dark:shadow-none p-3">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = iconMap[link.icon] || Home;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            {isAdmin &&
              ADMIN_NAV_LINKS.map((link) => {
                const Icon = iconMap[link.icon] || LayoutDashboard;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
          </nav>
        </div>

        
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm dark:shadow-none p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={14} className="text-surface-500" />
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">
              Quick Filters
            </h3>
          </div>
          <div className="space-y-1.5">
            {CATEGORIES.map((cat) => {
              const isFilterActive = activeFilters.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleFilter(cat.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${
                    isFilterActive
                      ? 'text-white font-medium'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                  style={
                    isFilterActive
                      ? { backgroundColor: cat.color }
                      : {}
                  }
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        
        {upcomingEvents.length > 0 && (
          <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm dark:shadow-none p-4">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-3">
              Coming Up
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const cat = getCategoryInfo(event.category);
                return (
                  <Link
                    key={event.id}
                    to={`/event/${event.id}`}
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {event.title}
                      </p>
                      <p className="text-xs text-surface-500">
                        {formatEventDate(event.date)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
