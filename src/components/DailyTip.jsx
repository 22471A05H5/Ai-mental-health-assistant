import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DailyTip = () => {
  const [dailyTip, setDailyTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder for AI-generated tips (future ChatGPT integration)
  const generateAITip = React.useCallback(async () => {
    const wellnessTips = [
      {
        tip: "Take 3 deep breaths and focus on the present moment.",
        category: "Mindfulness"
      },
      {
        tip: "Write down three things you're grateful for today.",
        category: "Gratitude"
      },
      {
        tip: "Go for a 10-minute walk in nature or around your neighborhood.",
        category: "Movement"
      },
      {
        tip: "Drink a glass of water and notice how it makes you feel refreshed.",
        category: "Self-Care"
      },
      {
        tip: "Call or text someone you care about to brighten both your days.",
        category: "Connection"
      },
      {
        tip: "Practice the 5-4-3-2-1 grounding technique: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.",
        category: "Mindfulness"
      },
      {
        tip: "Stretch your body gently for 5 minutes to release tension.",
        category: "Movement"
      },
      {
        tip: "Listen to your favorite calming song and let yourself fully enjoy it.",
        category: "Self-Care"
      },
      {
        tip: "Write down one small accomplishment from today, no matter how minor.",
        category: "Self-Compassion"
      },
      {
        tip: "Take a moment to appreciate something beautiful around you.",
        category: "Mindfulness"
      },
      {
        tip: "Do something kind for yourself, like making your favorite tea or taking a warm shower.",
        category: "Self-Care"
      },
      {
        tip: "Practice saying 'no' to something that drains your energy today.",
        category: "Boundaries"
      },
      {
        tip: "Spend 5 minutes organizing a small space to create a sense of calm.",
        category: "Environment"
      },
      {
        tip: "Read one page of a book or article that interests you.",
        category: "Growth"
      },
      {
        tip: "Practice progressive muscle relaxation: tense and release each muscle group.",
        category: "Relaxation"
      }
    ];

    // TODO: Replace with actual OpenAI API call
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'Generate a short, actionable wellness tip for mental health. Keep it under 100 characters and make it practical for daily life.'
    //       }
    //     ],
    //     max_tokens: 50,
    //     temperature: 0.8,
    //   }),
    // });
    // const data = await response.json();
    // return data.choices[0].message.content.trim();
    
    // For now, return a random tip from our curated list
    return wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
  }, []);

  useEffect(() => {
    const loadDailyTip = async () => {
      const today = new Date().toDateString();
      const savedTip = localStorage.getItem(`dailyTip_${today}`);
      
      if (savedTip) {
        // Use saved tip for today
        setDailyTip(JSON.parse(savedTip));
      } else {
        // Generate new tip for today
        const newTip = await generateAITip();
        const tipData = {
          ...newTip,
          date: today,
          timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`dailyTip_${today}`, JSON.stringify(tipData));
        setDailyTip(tipData);
      }
      
      setIsLoading(false);
    };

    loadDailyTip();
  }, [generateAITip]);

  const refreshTip = async () => {
    setIsLoading(true);
    const newTip = await generateAITip();
    const today = new Date().toDateString();
    const tipData = {
      ...newTip,
      date: today,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`dailyTip_${today}`, JSON.stringify(tipData));
    setDailyTip(tipData);
    setIsLoading(false);
  };

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Daily Wellness Tip
        </h2>
        
        {isLoading ? (
          <motion.div 
            className="flex items-center justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading your daily tip...</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
          >
            {/* Category Badge */}
            <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              {dailyTip.category}
            </div>
            
            {/* Tip Content */}
            <p className="text-lg text-gray-800 leading-relaxed mb-6 font-medium">
              {dailyTip.tip}
            </p>
            
            {/* Decorative Icon */}
            <div className="text-4xl mb-4">💡</div>
            
            {/* Refresh Button */}
            <motion.button
              onClick={refreshTip}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Get New Tip
            </motion.button>
          </motion.div>
        )}
        
        {/* Motivational Footer */}
        <motion.p 
          className="text-sm text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Small steps lead to big changes. You've got this! 🌟
        </motion.p>
      </div>
    </motion.section>
  );
};

export default DailyTip;
