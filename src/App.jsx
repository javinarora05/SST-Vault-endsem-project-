
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import useThemeStore from './store/useThemeStore';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FloatingActionButton from './components/FloatingActionButton';
import Toast from './components/Toast';
import LoadingSkeleton from './components/LoadingSkeleton';
import ProtectedRoute from './components/ProtectedRoute';



const HomePage = lazy(() => import('./pages/HomePage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));

const PageLoader = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <LoadingSkeleton variant="cards" count={6} />
  </div>
);

function App() {
  
  useAuth();

  
  const { initTheme } = useThemeStore();
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      
      <Navbar />

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          
          <Sidebar />

          
          <main className="flex-1 min-w-0">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                
                <Route path="/" element={<HomePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/event/:id" element={<EventDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                
                <Route
                  path="*"
                  element={
                    <div className="text-center py-20">
                      <p className="text-6xl mb-4">🚀</p>
                      <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                        Page Not Found
                      </h2>
                      <p className="text-surface-500">
                        The page you're looking for doesn't exist.
                      </p>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>

      
      <FloatingActionButton />

      
      <Toast />
    </div>
  );
}

export default App;
