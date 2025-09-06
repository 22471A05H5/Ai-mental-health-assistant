import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CrisisSupport = ({ isOpen, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');

  const crisisResources = {
    US: {
      country: 'United States',
      resources: [
        {
          name: '988 Suicide & Crisis Lifeline',
          number: '988',
          description: '24/7 free and confidential support',
          type: 'call'
        },
        {
          name: 'Crisis Text Line',
          number: 'Text HOME to 741741',
          description: 'Free 24/7 crisis counseling via text',
          type: 'text'
        },
        {
          name: 'National Domestic Violence Hotline',
          number: '1-800-799-7233',
          description: '24/7 support for domestic violence',
          type: 'call'
        },
        {
          name: 'SAMHSA National Helpline',
          number: '1-800-662-4357',
          description: 'Mental health and substance abuse',
          type: 'call'
        }
      ]
    },
    UK: {
      country: 'United Kingdom',
      resources: [
        {
          name: 'Samaritans',
          number: '116 123',
          description: 'Free 24/7 emotional support',
          type: 'call'
        },
        {
          name: 'Crisis Text Line UK',
          number: 'Text SHOUT to 85258',
          description: 'Free 24/7 text support',
          type: 'text'
        },
        {
          name: 'Mind Infoline',
          number: '0300 123 3393',
          description: 'Mental health information and support',
          type: 'call'
        }
      ]
    },
    CA: {
      country: 'Canada',
      resources: [
        {
          name: 'Talk Suicide Canada',
          number: '1-833-456-4566',
          description: '24/7 bilingual suicide prevention',
          type: 'call'
        },
        {
          name: 'Crisis Text Line Canada',
          number: 'Text TALK to 686868',
          description: 'Free 24/7 crisis support via text',
          type: 'text'
        },
        {
          name: 'Kids Help Phone',
          number: '1-800-668-6868',
          description: 'Support for young people',
          type: 'call'
        }
      ]
    },
    AU: {
      country: 'Australia',
      resources: [
        {
          name: 'Lifeline',
          number: '13 11 14',
          description: '24/7 crisis support and suicide prevention',
          type: 'call'
        },
        {
          name: 'Beyond Blue',
          number: '1300 22 4636',
          description: 'Depression, anxiety and suicide prevention',
          type: 'call'
        },
        {
          name: 'Kids Helpline',
          number: '1800 55 1800',
          description: 'Support for young people 5-25',
          type: 'call'
        }
      ]
    }
  };

  const emergencyTips = [
    {
      title: "If you're having thoughts of suicide:",
      tips: [
        "Call emergency services (911, 999, 000) immediately",
        "Go to your nearest emergency room",
        "Call a crisis hotline",
        "Reach out to a trusted friend or family member",
        "Remove any means of self-harm from your environment"
      ]
    },
    {
      title: "If you're experiencing a panic attack:",
      tips: [
        "Practice deep breathing (4-7-8 technique)",
        "Use grounding techniques (5-4-3-2-1 method)",
        "Remind yourself that this will pass",
        "Find a safe, quiet space",
        "Call someone you trust"
      ]
    },
    {
      title: "If you're in immediate danger:",
      tips: [
        "Call emergency services immediately",
        "Get to a safe location",
        "Contact local police",
        "Reach out to domestic violence hotlines",
        "Trust your instincts"
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-600 flex items-center">
              🚨 Crisis Support Resources
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center mb-2">
              <span className="text-red-500 text-xl mr-2">⚠️</span>
              <h3 className="text-lg font-semibold text-red-800">
                If this is a life-threatening emergency
              </h3>
            </div>
            <p className="text-red-700 font-medium">
              Call emergency services immediately: 911 (US), 999 (UK), 000 (AU), 112 (EU)
            </p>
          </div>

          {/* Country Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your location for local resources:
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(crisisResources).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.country}
                </option>
              ))}
            </select>
          </div>

          {/* Crisis Hotlines */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📞 Crisis Hotlines - {crisisResources[selectedCountry].country}
            </h3>
            <div className="grid gap-4">
              {crisisResources[selectedCountry].resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800 mb-1">
                        {resource.name}
                      </h4>
                      <p className="text-blue-700 mb-2">{resource.description}</p>
                      <div className="flex items-center">
                        <span className="text-sm text-blue-600 mr-2">
                          {resource.type === 'call' ? '📞' : '💬'}
                        </span>
                        <span className="font-mono text-lg font-bold text-blue-800">
                          {resource.number}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      onClick={() => {
                        if (resource.type === 'call') {
                          window.open(`tel:${resource.number.replace(/\D/g, '')}`);
                        }
                      }}
                    >
                      {resource.type === 'call' ? 'Call' : 'Text'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Tips */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              🆘 Emergency Coping Strategies
            </h3>
            <div className="space-y-4">
              {emergencyTips.map((section, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    {section.title}
                  </h4>
                  <ul className="text-yellow-700 space-y-1">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Online Resources */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              🌐 Online Support Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Crisis Chat Services</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Crisis Text Line (text-based support)</li>
                  <li>• 7 Cups (online emotional support)</li>
                  <li>• BetterHelp Crisis Support</li>
                  <li>• SAMHSA Online Treatment Locator</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Mental Health Apps</h4>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Calm (meditation and relaxation)</li>
                  <li>• Headspace (mindfulness)</li>
                  <li>• PTSD Coach (trauma support)</li>
                  <li>• MindShift (anxiety management)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Safety Planning */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📋 Create a Safety Plan
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>1. Warning signs:</strong> Identify your personal warning signs</p>
              <p><strong>2. Coping strategies:</strong> List things you can do on your own</p>
              <p><strong>3. Social contacts:</strong> People who can distract you</p>
              <p><strong>4. Professional contacts:</strong> Mental health professionals</p>
              <p><strong>5. Environment safety:</strong> Remove or secure lethal means</p>
              <p><strong>6. Emergency contacts:</strong> Keep crisis numbers easily accessible</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CrisisSupport;
