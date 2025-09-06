import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Affirmations = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [category, setCategory] = useState('general');
  const [favorites, setFavorites] = useState([]);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const affirmations = {
    general: [
      "I am worthy of love and respect.",
      "I choose peace over worry.",
      "I am capable of handling whatever comes my way.",
      "I trust in my ability to make good decisions.",
      "I am growing stronger every day.",
      "I deserve happiness and success.",
      "I am enough, just as I am.",
      "I choose to focus on what I can control.",
      "I am resilient and can overcome challenges.",
      "I believe in my potential."
    ],
    anxiety: [
      "I am safe in this moment.",
      "This feeling will pass, and I will be okay.",
      "I breathe deeply and release tension.",
      "I have survived difficult times before.",
      "I am stronger than my anxiety.",
      "I choose calm over chaos.",
      "I trust my ability to handle uncertainty.",
      "I am grounded and present.",
      "I release what I cannot control.",
      "Peace flows through my mind and body."
    ],
    confidence: [
      "I believe in myself and my abilities.",
      "I am confident in my decisions.",
      "I embrace my unique qualities.",
      "I speak up for myself with courage.",
      "I am proud of my progress.",
      "I trust my inner wisdom.",
      "I am capable of achieving my goals.",
      "I radiate confidence and positivity.",
      "I deserve to take up space.",
      "I am becoming the person I want to be."
    ],
    selfLove: [
      "I treat myself with kindness and compassion.",
      "I forgive myself for past mistakes.",
      "I celebrate my accomplishments, big and small.",
      "I am my own best friend.",
      "I honor my needs and boundaries.",
      "I speak to myself with love.",
      "I am deserving of good things.",
      "I accept myself unconditionally.",
      "I am beautiful inside and out.",
      "I choose self-compassion over self-criticism."
    ],
    motivation: [
      "I am motivated to create positive change.",
      "Every step forward is progress.",
      "I have the power to shape my future.",
      "I am committed to my growth.",
      "I turn challenges into opportunities.",
      "I am focused and determined.",
      "I take action towards my dreams.",
      "I am persistent in pursuing my goals.",
      "I embrace new possibilities.",
      "I am the author of my own story."
    ]
  };

  const categories = {
    general: { name: 'General Wellness', emoji: '🌟', color: 'blue' },
    anxiety: { name: 'Anxiety Relief', emoji: '🕊️', color: 'green' },
    confidence: { name: 'Confidence Building', emoji: '💪', color: 'purple' },
    selfLove: { name: 'Self-Love', emoji: '💖', color: 'pink' },
    motivation: { name: 'Motivation', emoji: '🚀', color: 'orange' }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteAffirmations');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Set initial affirmation
    getNewAffirmation();
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        getNewAffirmation();
      }, 10000); // Change every 10 seconds
      setAutoPlayInterval(interval);
    } else {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [isAutoPlay]);

  const getNewAffirmation = () => {
    const categoryAffirmations = affirmations[category];
    const randomAffirmation = categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)];
    setCurrentAffirmation(randomAffirmation);
  };

  const toggleFavorite = (affirmation) => {
    const updatedFavorites = favorites.includes(affirmation)
      ? favorites.filter(fav => fav !== affirmation)
      : [...favorites, affirmation];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteAffirmations', JSON.stringify(updatedFavorites));
  };

  const getColorClasses = (colorName) => {
    const colors = {
      blue: 'from-blue-400 to-blue-600',
      green: 'from-green-400 to-green-600',
      purple: 'from-purple-400 to-purple-600',
      pink: 'from-pink-400 to-pink-600',
      orange: 'from-orange-400 to-orange-600'
    };
    return colors[colorName] || colors.blue;
  };

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Daily Affirmations
      </h2>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose your focus:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(categories).map(([key, cat]) => (
            <motion.button
              key={key}
              onClick={() => {
                setCategory(key);
                setTimeout(getNewAffirmation, 100);
              }}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                category === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-lg mb-1">{cat.emoji}</div>
              <div className="font-medium">{cat.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Affirmation Display */}
      <div className="text-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAffirmation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${getColorClasses(categories[category].color)} rounded-2xl p-8 text-white relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-6xl">{categories[category].emoji}</div>
              <div className="absolute bottom-4 right-4 text-6xl transform rotate-12">{categories[category].emoji}</div>
            </div>
            
            {/* Affirmation Text */}
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-4">
                "{currentAffirmation}"
              </p>
              <div className="flex justify-center items-center space-x-4">
                <motion.button
                  onClick={() => toggleFavorite(currentAffirmation)}
                  className={`p-2 rounded-full transition-colors ${
                    favorites.includes(currentAffirmation)
                      ? 'bg-white bg-opacity-20 text-yellow-300'
                      : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {favorites.includes(currentAffirmation) ? '⭐' : '☆'}
                </motion.button>
                <span className="text-sm opacity-80">{categories[category].name}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <motion.button
          onClick={getNewAffirmation}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 New Affirmation
        </motion.button>
        
        <motion.button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isAutoPlay
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlay ? '⏸️ Stop Auto' : '▶️ Auto Play'}
        </motion.button>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">⭐</span>
            Your Favorite Affirmations ({favorites.length})
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {favorites.map((affirmation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200"
              >
                <p className="text-sm text-gray-800 flex-1">"{affirmation}"</p>
                <button
                  onClick={() => toggleFavorite(affirmation)}
                  className="ml-2 text-yellow-500 hover:text-yellow-600 p-1"
                >
                  ⭐
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-2">💡 How to Use Affirmations:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Repeat affirmations daily, preferably in the morning</li>
          <li>• Say them out loud or silently with intention</li>
          <li>• Believe in the words you're saying</li>
          <li>• Use present tense and positive language</li>
          <li>• Combine with deep breathing for better effect</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default Affirmations;
