import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Peaceful' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😴', label: 'Tired' }
  ];

  const prompts = [
    "What am I grateful for today?",
    "How did I handle stress today?",
    "What made me smile today?",
    "What challenged me and how did I grow?",
    "What would I tell my younger self?",
    "What are three things that went well today?",
    "How am I feeling right now and why?",
    "What do I need more of in my life?",
    "What boundary do I need to set?",
    "What am I proud of accomplishing recently?"
  ];

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry = {
      id: Date.now(),
      content: currentEntry,
      mood: selectedMood,
      date: new Date().toISOString(),
      dateString: new Date().toLocaleDateString(),
      timeString: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    // Reset form
    setCurrentEntry('');
    setSelectedMood('');
    setIsWriting(false);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setSelectedEntry(null);
  };

  const getRandomPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentEntry(randomPrompt + '\n\n');
    setIsWriting(true);
  };

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.dateString.includes(searchTerm)
  );

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <motion.section 
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Personal Journal
      </h2>

      {!isWriting ? (
        /* Journal Overview */
        <div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
              <div className="text-sm text-blue-800">Total Entries</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {entries.reduce((total, entry) => total + getWordCount(entry.content), 0)}
              </div>
              <div className="text-sm text-green-800">Words Written</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {entries.length > 0 ? Math.ceil(entries.length / 7) : 0}
              </div>
              <div className="text-sm text-purple-800">Weeks Active</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {entries.filter(entry => entry.dateString === new Date().toLocaleDateString()).length}
              </div>
              <div className="text-sm text-yellow-800">Today's Entries</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <motion.button
              onClick={() => setIsWriting(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✏️ New Entry
            </motion.button>
            <motion.button
              onClick={getRandomPrompt}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💡 Random Prompt
            </motion.button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Entries List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {entry.mood && (
                        <span className="text-lg">{entry.mood}</span>
                      )}
                      <span className="text-sm text-gray-600">
                        {entry.dateString} at {entry.timeString}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {getWordCount(entry.content)} words
                    </span>
                  </div>
                  <p className="text-gray-800 line-clamp-3">
                    {entry.content.substring(0, 150)}
                    {entry.content.length > 150 && '...'}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No entries match your search.' : 'No journal entries yet. Start writing!'}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Writing Interface */
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              How are you feeling?
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {moods.map((mood) => (
                <motion.button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.emoji)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    selectedMood === mood.emoji
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <div className="text-xs text-gray-600">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="What's on your mind? Write freely about your thoughts, feelings, or experiences..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{getWordCount(currentEntry)} words</span>
              <span>{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <motion.button
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Entry
            </motion.button>
            <motion.button
              onClick={() => {
                setIsWriting(false);
                setCurrentEntry('');
                setSelectedMood('');
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      )}

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  {selectedEntry.mood && (
                    <span className="text-2xl">{selectedEntry.mood}</span>
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">
                      {selectedEntry.dateString}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedEntry.timeString} • {getWordCount(selectedEntry.content)} words
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteEntry(selectedEntry.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="text-gray-800 whitespace-pre-wrap">
                {selectedEntry.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Journal;
