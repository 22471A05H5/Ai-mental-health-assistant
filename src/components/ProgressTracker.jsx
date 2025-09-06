import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProgressTracker = () => {
  const [wellnessData, setWellnessData] = useState({
    mood: [],
    meditation: [],
    journal: [],
    breathing: [],
    affirmations: []
  });

  useEffect(() => {
    loadWellnessData();
  }, []);

  const loadWellnessData = () => {
    // Load mood data
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    // Load meditation sessions
    const meditationSessions = JSON.parse(localStorage.getItem('meditationSessions') || '[]');
    
    // Load journal entries
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    
    // Load favorites (affirmations)
    const favoriteAffirmations = JSON.parse(localStorage.getItem('favoriteAffirmations') || '[]');

    setWellnessData({
      mood: moodHistory,
      meditation: meditationSessions,
      journal: journalEntries,
      breathing: [], // Would be populated if breathing exercises were tracked
      affirmations: favoriteAffirmations
    });
  };

  const getWeeklyMoodData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString();
      
      const dayMood = wellnessData.mood.find(m => m.date === dateString);
      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: dayMood ? dayMood.value : null,
        date: dateString
      });
    }
    return last7Days;
  };

  const getActivitySummary = () => {
    const thisWeek = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString();
      thisWeek.push(dateString);
    }

    return {
      moodEntries: wellnessData.mood.filter(m => thisWeek.includes(m.date)).length,
      meditationMinutes: wellnessData.meditation
        .filter(m => thisWeek.includes(m.date))
        .reduce((total, session) => total + session.duration, 0),
      journalEntries: wellnessData.journal.filter(j => thisWeek.includes(j.dateString)).length,
      favoriteAffirmations: wellnessData.affirmations.length
    };
  };

  const getStreakData = () => {
    const activities = ['mood', 'meditation', 'journal'];
    return activities.map(activity => {
      let streak = 0;
      const today = new Date();
      
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateString = checkDate.toLocaleDateString();
        
        let hasActivity = false;
        if (activity === 'mood') {
          hasActivity = wellnessData.mood.some(m => m.date === dateString);
        } else if (activity === 'meditation') {
          hasActivity = wellnessData.meditation.some(m => m.date === dateString);
        } else if (activity === 'journal') {
          hasActivity = wellnessData.journal.some(j => j.dateString === dateString);
        }
        
        if (hasActivity) {
          streak++;
        } else {
          break;
        }
      }
      
      return {
        activity: activity.charAt(0).toUpperCase() + activity.slice(1),
        streak,
        color: activity === 'mood' ? '#3B82F6' : activity === 'meditation' ? '#8B5CF6' : '#10B981'
      };
    });
  };

  const getMoodDistribution = () => {
    const moodCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    wellnessData.mood.forEach(entry => {
      moodCounts[entry.value]++;
    });

    const moodLabels = {
      0: 'Angry',
      1: 'Sad', 
      2: 'Neutral',
      3: 'Calm',
      4: 'Happy'
    };

    return Object.entries(moodCounts).map(([value, count]) => ({
      name: moodLabels[value],
      value: count,
      percentage: wellnessData.mood.length > 0 ? ((count / wellnessData.mood.length) * 100).toFixed(1) : 0
    }));
  };

  const summary = getActivitySummary();
  const streakData = getStreakData();
  const moodDistribution = getMoodDistribution();
  const weeklyMoodData = getWeeklyMoodData();

  const COLORS = ['#EF4444', '#F59E0B', '#6B7280', '#10B981', '#3B82F6'];

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Wellness Progress Tracker
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{summary.moodEntries}</div>
          <div className="text-sm text-blue-800">Mood Entries</div>
          <div className="text-xs text-blue-600">This Week</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">{summary.meditationMinutes}</div>
          <div className="text-sm text-purple-800">Meditation Min</div>
          <div className="text-xs text-purple-600">This Week</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">{summary.journalEntries}</div>
          <div className="text-sm text-green-800">Journal Entries</div>
          <div className="text-xs text-green-600">This Week</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-600">{summary.favoriteAffirmations}</div>
          <div className="text-sm text-yellow-800">Fav Affirmations</div>
          <div className="text-xs text-yellow-600">Total</div>
        </div>
      </div>

      {/* Streak Tracker */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Current Streaks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {streakData.map((item, index) => (
            <motion.div
              key={item.activity}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-4 rounded-xl text-center"
            >
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-xl font-bold" style={{ color: item.color }}>
                {item.streak} days
              </div>
              <div className="text-sm text-gray-600">{item.activity}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Mood Trend */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Weekly Mood Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyMoodData}>
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
                <Tooltip 
                  formatter={(value) => {
                    const moods = ['Angry', 'Sad', 'Neutral', 'Calm', 'Happy'];
                    return [moods[value] || 'No data', 'Mood'];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mood Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Mood Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} entries`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {moodDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{entry.name} ({entry.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Wellness Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">This Week's Highlights:</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• You tracked your mood {summary.moodEntries} times</li>
              <li>• You meditated for {summary.meditationMinutes} minutes total</li>
              <li>• You wrote {summary.journalEntries} journal entries</li>
              <li>• You have {summary.favoriteAffirmations} favorite affirmations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Recommendations:</h4>
            <ul className="text-gray-600 space-y-1">
              {summary.moodEntries < 3 && <li>• Try tracking your mood daily for better insights</li>}
              {summary.meditationMinutes < 30 && <li>• Consider adding more meditation to your routine</li>}
              {summary.journalEntries < 2 && <li>• Journaling can help process your thoughts</li>}
              <li>• Keep up the great work on your wellness journey!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Export Data Button */}
      <div className="mt-6 text-center">
        <motion.button
          onClick={() => {
            const data = {
              exported: new Date().toISOString(),
              ...wellnessData
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mindease-wellness-data-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📊 Export Data
        </motion.button>
      </div>
    </motion.section>
  );
};

export default ProgressTracker;
