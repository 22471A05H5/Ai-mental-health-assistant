# MindEase - AI Mental Health Assistant

A comprehensive, modern AI Mental Health Assistant website built with React and Tailwind CSS. MindEase provides a complete wellness toolkit for users to track their mental health journey, practice mindfulness, and access crisis support resources.

## 🌟 Features

### 🤖 AI Chatbot
- Interactive chat interface with supportive AI companion
- Empathetic responses for mental health support
- Ready for OpenAI ChatGPT API integration
- Real-time typing indicators and smooth animations

### 😊 Mood Tracker
- Emoji-based mood selection with 5 mood states
- Daily mood logging with localStorage persistence
- Weekly mood chart visualization using Recharts
- Mood distribution analytics and insights

### 🫁 Guided Breathing Exercises
- 4 breathing techniques (4-7-8, Box, Deep, Simple)
- Animated visual guidance with expanding circles
- Real-time phase instructions (inhale, hold, exhale)
- Cycle tracking and technique descriptions

### 🧘‍♀️ Meditation Timer
- Flexible duration presets (1-60 minutes)
- Circular progress visualization
- Session history and streak tracking
- Multiple ambient sound options (placeholder)

### 📝 Personal Journal
- Rich writing interface with mood selection
- Search and filter functionality
- Writing statistics and word count tracking
- Random prompts for inspiration
- Entry management with timestamps

### 💫 Daily Affirmations
- 5 categories: General, Anxiety Relief, Confidence, Self-Love, Motivation
- Auto-play mode with timed rotation
- Favorites system for personal affirmations
- Beautiful gradient backgrounds with animations

### 📊 Progress Tracker
- Comprehensive wellness analytics dashboard
- Visual charts for mood trends and activity patterns
- Streak tracking across all wellness activities
- Data export functionality (JSON format)
- Personalized insights and recommendations

### 🆘 Crisis Support
- International crisis hotlines (US, UK, Canada, Australia)
- Emergency coping strategies for different situations
- Safety planning guidelines
- Online resources and mental health apps

### 💡 Daily Wellness Tips
- Curated wellness tips with 15+ categories
- One tip per day with refresh functionality
- Categorized by Mindfulness, Self-Care, Movement, etc.
- Beautiful card-based UI design

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/mindease-ai-assistant.git
   cd mindease-ai-assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
# OpenAI API Configuration (Optional)
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Application Configuration
REACT_APP_NAME=MindEase
REACT_APP_VERSION=1.0.0
```

### ChatGPT Integration
To enable AI-powered responses:
1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add the key to your `.env` file
3. Uncomment API integration code in:
   - `src/components/Chatbot.jsx`
   - `src/components/DailyTip.jsx`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Gradient header with branding
│   ├── Chatbot.jsx          # AI chat interface
│   ├── MoodTracker.jsx      # Mood logging and visualization
│   ├── DailyTip.jsx         # Daily wellness tips
│   ├── BreathingExercise.jsx # Guided breathing exercises
│   ├── Journal.jsx          # Personal journaling system
│   ├── MeditationTimer.jsx  # Meditation timer and tracking
│   ├── Affirmations.jsx     # Daily affirmations system
│   ├── ProgressTracker.jsx  # Analytics and progress dashboard
│   ├── CrisisSupport.jsx    # Crisis resources modal
│   └── Footer.jsx           # Footer with disclaimers
├── App.js                   # Main application with tab navigation
├── index.js                 # React entry point
└── index.css               # Global styles and Tailwind imports
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library for data visualization
- **LocalStorage** - Client-side data persistence

## 🎨 Customization

### Theme Colors
Modify colors in `tailwind.config.js`:
```javascript
colors: {
  'lavender': '#E6E6FA',
  'soft-teal': '#B2DFDB',
  'sky-blue': '#87CEEB',
}
```

### Content Customization
- **Wellness Tips**: Edit `src/components/DailyTip.jsx`
- **Affirmations**: Modify categories in `src/components/Affirmations.jsx`
- **Mood Options**: Customize in `src/components/MoodTracker.jsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Or connect your GitHub repository for automatic deployments

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📱 Features Overview

### Navigation System
- **8 Main Sections**: Home, AI Chat, Mood, Journal, Meditate, Breathe, Affirm, Progress
- **Sticky Tab Navigation**: Always accessible navigation bar
- **Responsive Design**: Mobile-optimized with horizontal scroll

### Data Persistence
- **Local Storage**: All data persists between sessions
- **Cross-Component Integration**: Data flows between all features
- **Export Functionality**: Download wellness data as JSON
- **Privacy-First**: No external data collection

### User Experience
- **Progressive Web App Ready**: Can be installed on mobile devices
- **Offline Capable**: Core features work without internet
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance Optimized**: Lazy loading and efficient rendering

## 🔒 Privacy & Security

- **Local Data Storage**: All personal data stays on your device
- **No External Tracking**: No analytics or tracking scripts
- **HIPAA Considerations**: Designed with privacy best practices
- **Crisis Resources**: Immediate access to professional help

## ⚠️ Important Disclaimers

**Medical Disclaimer**: MindEase is designed for general wellness support and is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.

**Crisis Resources**:
- **US**: 988 Suicide & Crisis Lifeline
- **Crisis Text**: Text HOME to 741741
- **Emergency**: 911

## 🤝 Contributing

We welcome contributions! Please:
1. Maintain the calming, professional aesthetic
2. Ensure accessibility compliance
3. Test thoroughly on mobile devices
4. Follow mental health best practices
5. Include appropriate disclaimers

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

- **Technical Issues**: Create an issue in the GitHub repository
- **Mental Health Crisis**: Contact emergency services immediately
- **General Questions**: Refer to the documentation

---

**Remember**: Your mental health matters. This tool is here to support you, but professional help is always available when you need it. 💙
