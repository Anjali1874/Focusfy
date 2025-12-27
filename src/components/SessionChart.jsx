import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SessionChart = ({ userId }) => {
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    const generateMonthData = () => {
      const data = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.getDate(),
          sessions: Math.floor(Math.random() * 4)
        });
      }
      return data;
    };

    const storedData = localStorage.getItem(`monthData_${userId}`);
    if (storedData) {
      setMonthData(JSON.parse(storedData));
    } else {
      const data = generateMonthData();
      setMonthData(data);
      localStorage.setItem(`monthData_${userId}`, JSON.stringify(data));
    }
  }, [userId]);

  const maxSessions = Math.max(...monthData.map(d => d.sessions), 1);

  return (
    <div className="h-48 flex items-end justify-between gap-1">
      {monthData.map((data, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(data.sessions / maxSessions) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.02 }}
            className={`w-full rounded-t relative ${
              data.sessions === 0
                ? 'bg-slate-800'
                : data.sessions === 1
                ? 'bg-purple-900/50'
                : data.sessions === 2
                ? 'bg-purple-700/70'
                : 'bg-purple-500'
            } min-h-[4px]`}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {data.sessions} session{data.sessions !== 1 ? 's' : ''}
            </div>
          </motion.div>
          {index % 5 === 0 && (
            <span className="text-[10px] text-slate-500">{data.date}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionChart;