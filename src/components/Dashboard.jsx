import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Target, TrendingUp, Flame, Calendar, Award } from 'lucide-react';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';

const Dashboard = ({ userData }) => {
  const [stats, setStats] = useState({
    todayFocus: 0,
    weeklyGoal: 20,
    totalSessions: 0,
    averageFocus: 0
  });

  useEffect(() => {
    const storedStats = localStorage.getItem(`stats_${userData.id}`);
    if (storedStats) {
      setStats(JSON.parse(storedStats));
    }
  }, [userData.id]);

  // Replace Helmet: set title and meta description
  useEffect(() => {
    document.title = 'Dashboard - FocusFy';
    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = "View your focus metrics and productivity statistics on your FocusFy dashboard.";
  }, [userData.id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Title/meta handled via useEffect */}
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-purple-300">Here's your focus overview for today</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Link to="/focus" className="block">
              <StatsCard
              title="Today's Focus"
              value={`${stats.todayFocus}h`}
              icon={Clock}
              color="purple"
              trend="+12%"
              />
            </Link>
            <StatsCard
              title="Weekly Goal"
              value={`${stats.todayFocus}/${stats.weeklyGoal}h`}
              icon={Target}
              color="blue"
              progress={(stats.todayFocus / stats.weeklyGoal) * 100}
            />
            <Link to="/leaderboard" className="block">
              <StatsCard
              title="Total Sessions"
              value={stats.totalSessions}
              icon={TrendingUp}
              color="green"
              trend="+5"
              />
            </Link>
            <Link to="/profile" className="block">
              <StatsCard
              title="Current Streak"
              value={`${userData.streak} days`}
              icon={Flame}
              color="orange"
              />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Weekly Activity
                </h2>
              </div>
              <ActivityChart userId={userData.id} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-purple-400" />
                Recent Achievements
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'First Session', desc: 'Complete your first focus session', earned: true },
                  { title: 'Week Warrior', desc: 'Focus for 20 hours in a week', earned: false },
                  { title: 'Streak Master', desc: 'Maintain a 7-day streak', earned: false }
                ].map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? 'bg-purple-900/30 border-purple-500/50'
                        : 'bg-slate-800/30 border-slate-700/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-purple-600' : 'bg-slate-700'
                      }`}>
                        🏆
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{achievement.title}</p>
                        <p className="text-xs text-slate-400">{achievement.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">💡 Focus Tip of the Day</h3>
            <p className="text-purple-200">
              Try the Pomodoro Technique: Focus for 25 minutes, then take a 5-minute break. This helps maintain concentration and prevents burnout.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;