
import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, LogOut, User, LayoutDashboard } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { logOut } from '../services/authService';
import SearchBar from './SearchBar';
import { getInitials } from '../utils/helpers';
import { NAV_LINKS, ADMIN_NAV_LINKS } from '../utils/constants';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, isAdmin, profile } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  
  const handleLogout = useCallback(async () => {
    try {
      await logOut();
      setProfileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigate]);

  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                SST Pulse
              </span>
            </Link>
          </div>

          
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAdmin &&
              ADMIN_NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          
          <div className="flex items-center gap-2">
            
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            

            
            {user && (
              <button
                className="p-2 rounded-xl text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse-soft" />
              </button>
            )}

            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  aria-label="Profile menu"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-semibold">
                      {getInitials(user.displayName)}
                    </div>
                  )}
                </button>

                
                {profileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-12 z-50 w-56 bg-white dark:bg-surface-800 rounded-2xl shadow-xl border border-surface-200 dark:border-surface-700 py-2 animate-scale-in">
                      <div className="px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                        <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-surface-500 truncate">
                          {user.email}
                        </p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
              >
                Log In
              </Link>
            )}

            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 animate-slide-down">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
          <div className="px-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-surface-700 dark:text-surface-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin &&
              ADMIN_NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-surface-700 dark:text-surface-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
