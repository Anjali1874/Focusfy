import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FlashScreen from './components/FlashScreen';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import FocusSession from './components/FocusSession';
import TodoMaker from './components/TodoMaker';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import { Toaster } from './components/ui/toaster';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Safety timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    try {
      const storedUser = localStorage.getItem('focusUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          setUserData(parsedUser);
          setIsAuthenticated(true);
        } else {
          // Invalid user data structure
          localStorage.removeItem('focusUser');
        }
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem('focusUser');
    }

    return () => clearTimeout(timer);
  }, []);

  // Manage document title and meta description without react-helmet
  useEffect(() => {
    if (!isAuthenticated) {
      document.title = 'Login - FocusFy';
    } else {
      document.title = 'FocusFy - Student Focus Monitoring & Productivity';
    }
    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = "Track your focus, boost productivity, and achieve your academic goals with FocusFy's intelligent monitoring system.";
  }, [isAuthenticated]);

  const handleLogin = (user) => {
    setUserData(user);
    setIsAuthenticated(true);
    localStorage.setItem('focusUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('focusUser');
    setCurrentPage('dashboard');
  };

  if (isLoading) {
    return <FlashScreen />;
  }

  // If not authenticated, show AuthPage regardless of routing
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950">
        <AuthPage onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} userData={userData} onLogout={handleLogout} />
        <main className="flex-1 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard userData={userData} />} />
            <Route path="/focus" element={<FocusSession userData={userData} />} />
            <Route path="/todo" element={<TodoMaker userData={userData} />} />
            <Route path="/leaderboard" element={<Leaderboard userData={userData} />} />
            <Route path="/profile" element={<Profile userData={userData} onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;