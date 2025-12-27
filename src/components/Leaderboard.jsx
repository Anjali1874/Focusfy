import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Leaderboard = ({ userData }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const mockData = [
      {
        id: userData.id,
        name: userData.name,
        avatar: userData.avatar,
        focusTime: 42,
        streak: userData.streak || 5,
        level: userData.level || 8
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        focusTime: 56,
        streak: 12,
        level: 12
      },
      {
        id: '3',
        name: 'Alex Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        focusTime: 48,
        streak: 8,
        level: 10
      },
      {
        id: '4',
        name: 'Emily Davis',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
        focusTime: 39,
        streak: 6,
        level: 7
      },
      {
        id: '5',
        name: 'Michael Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        focusTime: 35,
        streak: 4,
        level: 6
      }
    ];

    const sorted = mockData.sort((a, b) => b.focusTime - a.focusTime);
    setLeaderboardData(sorted);
  }, [userData, timeframe]);

  // Replace Helmet: set title and meta description
  useEffect(() => {
    document.title = 'Leaderboard - FocusFy';
    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = 'Compare your progress with other students on the FocusFy leaderboard.';
  }, []);

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (index === 1) return <Medal className="w-6 h-6 text-slate-400" />;
    if (index === 2) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-slate-500 font-bold">{index + 1}</span>;
  };

  const getRankColor = (index) => {
    if (index === 0) return 'from-yellow-600/20 to-yellow-500/20 border-yellow-500/40';
    if (index === 1) return 'from-slate-600/20 to-slate-500/20 border-slate-500/40';
    if (index === 2) return 'from-orange-600/20 to-orange-500/20 border-orange-500/40';
    return 'from-purple-600/10 to-purple-500/10 border-purple-500/20';
  };

  return (
    <>
      {/* Title/meta handled via useEffect */}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Trophy className="w-10 h-10 text-purple-400" />
              Leaderboard
            </h1>
            <p className="text-purple-300">See how you rank among other focused students</p>
          </motion.div>

          <div className="flex gap-3 mb-6">
            {['week', 'month', 'all-time'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                {tf.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-r ${getRankColor(index)} backdrop-blur-xl border rounded-xl p-4 ${
                  user.id === userData.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(index)}
                  </div>

                  <Avatar className="w-12 h-12 border-2 border-purple-500/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-purple-600">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white truncate">
                        {user.name}
                        {user.id === userData.id && (
                          <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded-full">You</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Level {user.level}
                      </span>
                      <span>🔥 {user.streak} days</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{user.focusTime}h</p>
                    <p className="text-xs text-slate-400">Focus Time</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Your Stats</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Current Rank</p>
                <p className="text-2xl font-bold text-white">
                  #{leaderboardData.findIndex(u => u.id === userData.id) + 1}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Focus Time</p>
                <p className="text-2xl font-bold text-white">
                  {leaderboardData.find(u => u.id === userData.id)?.focusTime || 0}h
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Streak</p>
                <p className="text-2xl font-bold text-white">
                  {userData.streak || 0} 🔥
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;