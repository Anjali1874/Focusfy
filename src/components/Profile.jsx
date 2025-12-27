import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, LogOut, Settings, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import SessionChart from './SessionChart';

const Profile = ({ userData, onLogout }) => {
  const [stats, setStats] = useState({
    totalFocusTime: 0,
    totalSessions: 0,
    averageSession: 0,
    longestStreak: 0
  });

  useEffect(() => {
    const storedStats = localStorage.getItem(`stats_${userData.id}`);
    if (storedStats) {
      const data = JSON.parse(storedStats);
      setStats({
        totalFocusTime: data.todayFocus * 30 || 85,
        totalSessions: data.totalSessions || 24,
        averageSession: data.totalSessions ? (data.todayFocus * 30 / data.totalSessions).toFixed(1) : 0,
        longestStreak: userData.streak + 2 || 7
      });
    }
  }, [userData]);

  // Replace Helmet: set title and meta description
  useEffect(() => {
    document.title = 'Profile - FocusFy';
    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = 'View your profile, statistics, and achievements on FocusFy.';
  }, []);

  const achievements = [
    { icon: '🎯', name: 'First Session', desc: 'Complete your first focus session', earned: true },
    { icon: '🔥', name: 'Week Warrior', desc: 'Maintain a 7-day streak', earned: userData.streak >= 7 },
    { icon: '⭐', name: 'Focus Master', desc: 'Complete 50 sessions', earned: stats.totalSessions >= 50 },
    { icon: '🏆', name: 'Century Club', desc: 'Focus for 100 hours', earned: stats.totalFocusTime >= 100 }
  ];

  return (
    <>
      {/* Title/meta handled via useEffect */}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 mb-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-purple-500/30">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-purple-600 text-2xl">
                  {userData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                <p className="text-purple-300 mb-4">{userData.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm font-medium">
                    Level {userData.level}
                  </span>
                  <span className="px-3 py-1 bg-orange-600/30 text-orange-300 rounded-full text-sm font-medium">
                    🔥 {userData.streak} Day Streak
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-purple-500/50 hover:bg-purple-500/10"
                  onClick={() => {}}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="destructive"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
            >
              <Clock className="w-8 h-8 text-purple-400 mb-3" />
              <p className="text-slate-400 text-sm mb-1">Total Focus Time</p>
              <p className="text-3xl font-bold text-white">{stats.totalFocusTime}h</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6"
            >
              <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
              <p className="text-slate-400 text-sm mb-1">Total Sessions</p>
              <p className="text-3xl font-bold text-white">{stats.totalSessions}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-xl p-6"
            >
              <Calendar className="w-8 h-8 text-green-400 mb-3" />
              <p className="text-slate-400 text-sm mb-1">Avg Session</p>
              <p className="text-3xl font-bold text-white">{stats.averageSession}h</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6"
            >
              <Award className="w-8 h-8 text-orange-400 mb-3" />
              <p className="text-slate-400 text-sm mb-1">Longest Streak</p>
              <p className="text-3xl font-bold text-white">{stats.longestStreak} days</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Session History
              </h2>
              <SessionChart userId={userData.id} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? 'bg-purple-900/30 border-purple-500/50'
                        : 'bg-slate-800/30 border-slate-700/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                        achievement.earned ? 'bg-purple-600' : 'bg-slate-700'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {achievement.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{achievement.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;