import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color, trend, progress }) => {
  const colorClasses = {
    purple: 'from-purple-600 to-purple-500',
    blue: 'from-blue-600 to-blue-500',
    green: 'from-green-600 to-green-500',
    orange: 'from-orange-600 to-orange-500'
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      {progress !== undefined && (
        <div className="w-full bg-slate-800 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          />
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;