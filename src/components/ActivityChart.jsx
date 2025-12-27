import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ActivityChart = ({ userId }) => {
  const [weekData, setWeekData] = useState([
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 }
  ]);

  useEffect(() => {
    const storedData = localStorage.getItem(`weekData_${userId}`);
    if (storedData) {
      setWeekData(JSON.parse(storedData));
    }
  }, [userId]);

  const maxHours = Math.max(...weekData.map(d => d.hours), 5);

  return (
    <div className="h-64 flex items-end justify-between gap-4">
      {weekData.map((data, index) => (
        <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(data.hours / maxHours) * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg min-h-[20px] relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {data.hours}h
            </div>
          </motion.div>
          <span className="text-xs text-slate-400 font-medium">{data.day}</span>
        </div>
      ))}
    </div>
  );
};

export default ActivityChart;