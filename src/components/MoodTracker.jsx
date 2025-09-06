import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [todaysMood, setTodaysMood] = useState(null);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 4 },
    { emoji: '😌', label: 'Calm', value: 3 },
    { emoji: '😐', label: 'Neutral', value: 2 },
    { emoji: '😔', label: 'Sad', value: 1 },
    { emoji: '😡', label: 'Angry', value: 0 }
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }

    // Check if mood was already set today
    const today = new Date().toDateString();
    const todayMood = localStorage.getItem(`mood_${today}`);
    if (todayMood) {
      const moodData = JSON.parse(todayMood);
      setTodaysMood(moodData);
      setSelectedMood(moodData.value);
    }
  }, []);

  const saveMood = (mood) => {
    const today = new Date();
    const dateString = today.toDateString();
    const moodData = {
      date: dateString,
      mood: mood.label,
      emoji: mood.emoji,
      value: mood.value,
      timestamp: today.toISOString()
    };

    // Save today's mood
    localStorage.setItem(`mood_${dateString}`, JSON.stringify(moodData));
    setTodaysMood(moodData);
    setSelectedMood(mood.value);

    // Update mood history for chart
    const updatedHistory = [...moodHistory];
    const existingIndex = updatedHistory.findIndex(entry => entry.date === dateString);
    
    if (existingIndex >= 0) {
      updatedHistory[existingIndex] = moodData;
    } else {
      updatedHistory.push(moodData);
    }

    // Keep only last 7 days
    const last7Days = updatedHistory
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 7)
      .reverse();

    setMoodHistory(last7Days);
    localStorage.setItem('moodHistory', JSON.stringify(last7Days));
  };

  const getChartData = () => {
    return moodHistory.map((entry, index) => ({
      day: `Day ${index + 1}`,
      mood: entry.value,
      label: entry.mood,
      emoji: entry.emoji
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{`${data.emoji} ${data.label}`}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Daily Mood Tracker
      </h2>
      
      {/* Today's Mood Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          How are you feeling today?
        </h3>
        
        {todaysMood ? (
          <motion.div 
            className="text-center p-4 bg-green-50 rounded-xl border border-green-200"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-2">{todaysMood.emoji}</div>
            <p className="text-lg font-medium text-green-800">
              You're feeling {todaysMood.mood} today
            </p>
            <p className="text-sm text-green-600 mt-1">
              Mood recorded! You can update it anytime.
            </p>
          </motion.div>
        ) : (
          <div className="flex justify-center space-x-4 flex-wrap gap-2">
            {moods.map((mood) => (
              <motion.button
                key={mood.value}
                onClick={() => saveMood(mood)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'border-blue-500 bg-blue-50 scale-110'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-1">{mood.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{mood.label}</div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Mood Chart */}
      {moodHistory.length > 0 && (
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Your Mood This Week
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Mood Legend */}
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            {moods.map((mood) => (
              <div key={mood.value} className="flex items-center space-x-1">
                <span>{mood.emoji}</span>
                <span className="text-gray-600">{mood.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default MoodTracker;
