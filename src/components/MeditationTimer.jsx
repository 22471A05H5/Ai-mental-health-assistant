import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MeditationTimer = () => {
  const [duration, setDuration] = useState(5); // minutes
  const [timeLeft, setTimeLeft] = useState(300); // seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSound, setSelectedSound] = useState('none');
  const [sessions, setSessions] = useState([]);
  const intervalRef = useRef(null);

  const sounds = {
    none: { name: 'Silence', description: 'Pure silence for focused meditation' },
    rain: { name: 'Rain', description: 'Gentle rainfall sounds' },
    ocean: { name: 'Ocean Waves', description: 'Calming ocean waves' },
    forest: { name: 'Forest', description: 'Birds and nature sounds' },
    bells: { name: 'Tibetan Bells', description: 'Peaceful meditation bells' },
    white: { name: 'White Noise', description: 'Consistent background noise' }
  };

  const presetDurations = [1, 3, 5, 10, 15, 20, 30, 45, 60];

  useEffect(() => {
    const savedSessions = localStorage.getItem('meditationSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  const completeSession = React.useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    
    const session = {
      id: Date.now(),
      duration: duration,
      completedAt: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sound: selectedSound
    };

    const updatedSessions = [session, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('meditationSessions', JSON.stringify(updatedSessions));
    
    // Reset timer
    setTimeLeft(duration * 60);
    
    // Show completion notification (you could add a toast here)
    alert('🧘‍♀️ Meditation session complete! Well done!');
  }, [duration, selectedSound, sessions]);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            completeSession();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, completeSession]);


  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalSeconds = duration * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const getTotalMeditationTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getStreakDays = () => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    const todaySessions = sessions.filter(s => s.date === today);
    const yesterdaySessions = sessions.filter(s => s.date === yesterday);
    
    if (todaySessions.length > 0) {
      return yesterdaySessions.length > 0 ? 2 : 1; // Simplified streak calculation
    }
    return 0;
  };

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Meditation Timer
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-purple-600">{sessions.length}</div>
          <div className="text-xs text-purple-800">Sessions</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-blue-600">{getTotalMeditationTime()}</div>
          <div className="text-xs text-blue-800">Total Minutes</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-green-600">{getStreakDays()}</div>
          <div className="text-xs text-green-800">Day Streak</div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Progress Circle */}
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#8b5cf6"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
              transition={{ duration: 0.5 }}
            />
          </svg>
          
          {/* Timer Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-1">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">
                {isActive ? (isPaused ? 'Paused' : 'Meditating') : 'Ready'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration Presets */}
      {!isActive && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes):
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {presetDurations.map((preset) => (
              <motion.button
                key={preset}
                onClick={() => setDuration(preset)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  duration === preset
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {preset}m
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Sound Selection */}
      {!isActive && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Sound:
          </label>
          <select
            value={selectedSound}
            onChange={(e) => setSelectedSound(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(sounds).map(([key, sound]) => (
              <option key={key} value={key}>
                {sound.name} - {sound.description}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-3 mb-6">
        {!isActive ? (
          <motion.button
            onClick={startTimer}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🧘‍♀️ Start Meditation
          </motion.button>
        ) : (
          <>
            <motion.button
              onClick={pauseTimer}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </motion.button>
            <motion.button
              onClick={resetTimer}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Reset
            </motion.button>
          </>
        )}
      </div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Sessions</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {sessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                <span>{session.date} at {session.time}</span>
                <span className="font-medium">{session.duration} min</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meditation Tips */}
      <div className="mt-6 p-4 bg-purple-50 rounded-xl">
        <h4 className="font-semibold text-purple-800 mb-2">💡 Meditation Tips:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Find a comfortable, quiet position</li>
          <li>• Focus on your breath or chosen meditation technique</li>
          <li>• It's normal for your mind to wander - gently return focus</li>
          <li>• Start with shorter sessions and gradually increase duration</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default MeditationTimer;
