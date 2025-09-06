import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import MoodTracker from './components/MoodTracker';
import DailyTip from './components/DailyTip';
import BreathingExercise from './components/BreathingExercise';
import Journal from './components/Journal';
import MeditationTimer from './components/MeditationTimer';
import Affirmations from './components/Affirmations';
import ProgressTracker from './components/ProgressTracker';
import CrisisSupport from './components/CrisisSupport';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const tabs = [
    { id: 'home', name: 'Home', emoji: '🏠' },
    { id: 'chat', name: 'AI Chat', emoji: '🤖' },
    { id: 'mood', name: 'Mood', emoji: '😊' },
    { id: 'journal', name: 'Journal', emoji: '📝' },
    { id: 'meditation', name: 'Meditate', emoji: '🧘‍♀️' },
    { id: 'breathing', name: 'Breathe', emoji: '🫁' },
    { id: 'affirmations', name: 'Affirm', emoji: '💫' },
    { id: 'progress', name: 'Progress', emoji: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <motion.section 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Welcome to Your Personal Wellness Space
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Take a moment to check in with yourself. Track your mood, chat with your AI companion, 
                and discover daily wellness tips to support your mental health journey.
              </p>
            </motion.section>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <DailyTip />
                <MoodTracker />
              </div>
              <div className="space-y-6">
                <Chatbot />
                
                {/* Quick Actions */}
                <motion.section 
                  className="bg-white rounded-2xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Quick Wellness Tools
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button 
                      onClick={() => setActiveTab('breathing')}
                      className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100 hover:bg-blue-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl mb-2">🫁</div>
                      <h4 className="font-medium text-gray-800 mb-1">Breathing</h4>
                      <p className="text-sm text-gray-600">Guided exercises</p>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => setActiveTab('meditation')}
                      className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100 hover:bg-purple-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl mb-2">🧘‍♀️</div>
                      <h4 className="font-medium text-gray-800 mb-1">Meditation</h4>
                      <p className="text-sm text-gray-600">Timer & sessions</p>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => setActiveTab('journal')}
                      className="bg-green-50 p-4 rounded-xl text-center border border-green-100 hover:bg-green-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl mb-2">📝</div>
                      <h4 className="font-medium text-gray-800 mb-1">Journal</h4>
                      <p className="text-sm text-gray-600">Write thoughts</p>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => setActiveTab('affirmations')}
                      className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100 hover:bg-yellow-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl mb-2">💫</div>
                      <h4 className="font-medium text-gray-800 mb-1">Affirmations</h4>
                      <p className="text-sm text-gray-600">Daily positivity</p>
                    </motion.button>
                  </div>
                </motion.section>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return <Chatbot />;
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'meditation':
        return <MeditationTimer />;
      case 'breathing':
        return <BreathingExercise />;
      case 'affirmations':
        return <Affirmations />;
      case 'progress':
        return <ProgressTracker />;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender via-white to-soft-teal">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto py-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{tab.emoji}</span>
                <span className="text-sm font-medium">{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      <motion.main 
        className="max-w-6xl mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {renderContent()}

        {/* Emergency Support Banner */}
        <motion.section 
          className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-lg font-bold text-red-800 mb-2">
            Need Immediate Support?
          </h3>
          <p className="text-red-700 mb-4">
            If you're experiencing a mental health crisis, please reach out for professional help immediately.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
            <div className="bg-red-100 px-4 py-2 rounded-lg">
              <strong>Crisis Lifeline:</strong> 988
            </div>
            <div className="bg-red-100 px-4 py-2 rounded-lg">
              <strong>Crisis Text:</strong> Text HOME to 741741
            </div>
            <motion.button
              onClick={() => setShowCrisisModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🆘 Crisis Resources
            </motion.button>
          </div>
        </motion.section>
      </motion.main>
      
      <Footer />
      
      {/* Crisis Support Modal */}
      <CrisisSupport 
        isOpen={showCrisisModal} 
        onClose={() => setShowCrisisModal(false)} 
      />
    </div>
  );
}

export default App;
