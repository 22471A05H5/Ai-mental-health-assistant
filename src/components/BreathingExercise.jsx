import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [technique, setTechnique] = useState('4-7-8');
  const intervalRef = useRef(null);

  const techniques = {
    '4-7-8': { inhale: 4, hold: 7, exhale: 8 },
    '4-4-4': { inhale: 4, hold: 4, exhale: 4 },
    '6-2-6': { inhale: 6, hold: 2, exhale: 6 },
    'simple': { inhale: 4, hold: 0, exhale: 4 }
  };

  const currentTechnique = techniques[technique];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              if (currentTechnique.hold > 0) {
                setPhase('hold');
                return currentTechnique.hold;
              } else {
                setPhase('exhale');
                return currentTechnique.exhale;
              }
            } else if (phase === 'hold') {
              setPhase('exhale');
              return currentTechnique.exhale;
            } else {
              setPhase('inhale');
              setCycle(prev => prev + 1);
              return currentTechnique.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, phase, currentTechnique]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(currentTechnique.inhale);
    setCycle(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(currentTechnique.inhale);
    clearInterval(intervalRef.current);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      default: return 'Ready';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 1.5;
      case 'hold': return 1.5;
      case 'exhale': return 0.8;
      default: return 1;
    }
  };

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Guided Breathing Exercise
      </h2>

      {/* Technique Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Breathing Technique:
        </label>
        <select
          value={technique}
          onChange={(e) => setTechnique(e.target.value)}
          disabled={isActive}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        >
          <option value="4-7-8">4-7-8 Technique (Relaxation)</option>
          <option value="4-4-4">Box Breathing (Focus)</option>
          <option value="6-2-6">Deep Breathing (Calm)</option>
          <option value="simple">Simple Breathing (Beginner)</option>
        </select>
      </div>

      {/* Breathing Circle Animation */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-64 h-64 flex items-center justify-center mb-6">
          <motion.div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center shadow-lg`}
            animate={{
              scale: isActive ? getCircleScale() : 1,
            }}
            transition={{
              duration: isActive ? count : 0.5,
              ease: "easeInOut"
            }}
          >
            <div className="text-white text-center">
              <div className="text-3xl font-bold mb-1">{count}</div>
              <div className="text-sm font-medium">{getPhaseInstruction()}</div>
            </div>
          </motion.div>
          
          {/* Outer ring */}
          <motion.div
            className="absolute w-48 h-48 border-4 border-gray-200 rounded-full"
            animate={{
              rotate: isActive ? 360 : 0,
            }}
            transition={{
              duration: isActive ? (currentTechnique.inhale + currentTechnique.hold + currentTechnique.exhale) : 0,
              repeat: isActive ? Infinity : 0,
              ease: "linear"
            }}
          />
        </div>

        {/* Phase Indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-4"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {getPhaseInstruction()}
            </h3>
            <p className="text-gray-600">
              {phase === 'inhale' && 'Fill your lungs slowly and deeply'}
              {phase === 'hold' && 'Hold your breath gently'}
              {phase === 'exhale' && 'Release the air slowly and completely'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Cycle Counter */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4"
          >
            <p className="text-sm text-gray-600">
              Cycle: <span className="font-semibold">{cycle}</span>
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isActive ? (
          <motion.button
            onClick={startExercise}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Breathing Exercise
          </motion.button>
        ) : (
          <motion.button
            onClick={stopExercise}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Stop Exercise
          </motion.button>
        )}
      </div>

      {/* Technique Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-2">About {technique.toUpperCase()} Technique:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Inhale for {currentTechnique.inhale} seconds</p>
          {currentTechnique.hold > 0 && <p>• Hold for {currentTechnique.hold} seconds</p>}
          <p>• Exhale for {currentTechnique.exhale} seconds</p>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {technique === '4-7-8' && 'Great for relaxation and falling asleep'}
          {technique === '4-4-4' && 'Helps improve focus and reduce anxiety'}
          {technique === '6-2-6' && 'Perfect for deep relaxation and stress relief'}
          {technique === 'simple' && 'Ideal for beginners and quick stress relief'}
        </div>
      </div>
    </motion.section>
  );
};

export default BreathingExercise;
