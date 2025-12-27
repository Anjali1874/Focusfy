import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Focus, CheckSquare, Trophy, User, Menu, X, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Sidebar = ({ currentPage, setCurrentPage, userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'focus', label: 'Focus Session', icon: Focus },
    { id: 'todo', label: 'Todo List', icon: CheckSquare },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <motion.aside
        initial={false}
        animate={{
          x: isOpen || isLarge ? 0 : '-100%',
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-purple-500/20 lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-8 px-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              FocusFy
            </h1>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg mb-6 border border-purple-500/20">
            <Avatar>
              <AvatarImage src={userData?.avatar} alt={userData?.name} />
              <AvatarFallback className="bg-purple-600">
                {userData?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{userData?.name}</p>
              <p className="text-xs text-purple-300">Level {userData?.level || 1}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                    const path = item.id === 'dashboard' ? '/' : `/${item.id}`;
                    navigate(path);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className="mt-auto p-4 bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300 mb-1">Daily Streak</p>
            <p className="text-2xl font-bold text-white">{userData?.streak || 0} 🔥</p>
          </div>
        </div>
      </motion.aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export default Sidebar;