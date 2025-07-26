# Vindex CLI 🚀

A beautiful CLI tool that helps developers choose the best project ideas by scoring them based on impact, time, ROI, and using Max Heap prioritization with timeboxing.

## ✨ Features

- 🎨 **Epic Terminal UX** - Beautiful ASCII art, animations, and color-coded output
- 🧠 **Smart Prioritization** - Max Heap algorithm for optimal idea sorting
- ⏰ **Time Boxing** - Intelligent scheduling recommendations
- 🎯 **Interactive Prompts** - Smooth, guided input flow
- 🌙 **Theme Support** - Dark and light mode options
- 🎬 **Demo Mode** - Showcase the tool with pre-filled data
- 💾 **Persistent Storage** - Ideas saved locally between sessions

## 🚀 Quick Start

### Installation

```bash
# Navigate to the CLI directory
cd cli_interface

# Install dependencies
npm install

# Make it globally available
npm install -g .

# Or run directly
npm start
```

### Usage

```bash
# Start Vindex
vindex

# Run demo mode
vindex --demo

# Use dark theme
vindex --dark

# Use light theme
vindex --light
```

## 🎯 How It Works

### 1. Add Project Ideas
```
📝 What's your new project idea?
> Build a SaaS to schedule tweets from Notion

🧠 How impactful is it? (1-10)
> 9

⏱️ How long will it take? (in days)
> 5

💰 Potential ROI (1-10)
> 8
```

### 2. Smart Scoring Algorithm
Vindex uses a weighted scoring system:
- **Impact (40%)** - How much value will this create?
- **ROI (40%)** - What's the potential return on investment?
- **Time (20%)** - Shorter projects get higher scores

### 3. Max Heap Prioritization
Ideas are sorted using a Max Heap data structure for optimal performance and clear priority ranking.

### 4. Time Boxing
Get intelligent scheduling recommendations:
- Recommended daily hours
- Weekly schedule
- Target completion date
- Motivational messages

## 🎨 CLI Features

### Beautiful Output
- ASCII art splash screen
- Animated text and spinners
- Color-coded progress bars
- Boxed information displays
- Gradient text effects

### Interactive Menus
- Guided prompts with validation
- Confirmation dialogs
- List selections
- Number inputs with ranges

### Visual Elements
- Progress bars for scores
- Rank emojis (🥇🥈🥉)
- Status indicators
- Motivational messages

## 📊 Example Output

```
🏆 Prioritized Ideas (Max Heap Sort):

🥇 Build a SaaS to schedule tweets from Notion
   Priority Score: 91/100
   Impact: 9/10 | ROI: 8/10 | Time: 5 days

⏰ Timebox Recommendation:

Build a SaaS to schedule tweets from Notion

Estimated Duration: 5 days
Recommended Schedule:
  • 4 hours per day
  • 5 days per week
  • 2 weeks to complete

Suggested Start: Today!
Target Completion: 12/15/2024

🚀 Ready to ship!
```

## 🛠️ Technical Stack

- **Node.js** - Runtime environment
- **Inquirer** - Interactive prompts
- **Chalk** - Terminal styling
- **Ora** - Spinners and loading states
- **Chalk-animation** - Text animations
- **Gradient-string** - Gradient text effects
- **Boxen** - Boxed output
- **Conf** - Persistent storage

## 🎬 Demo Mode

Run `vindex --demo` to see the tool in action with pre-filled project ideas:

1. **SaaS Tweet Scheduler** - High impact, medium time
2. **Habit Tracking App** - Medium impact, quick win
3. **Browser Extension** - Lower impact, very quick
4. **AI Resume Parser** - High impact, longer project
5. **Task Management Tool** - Simple utility

## 🎨 Themes

```bash
# Default theme (cyan accents)
vindex

# Dark theme
vindex --dark

# Light theme  
vindex --light
```

## 📁 Project Structure

```
cli_interface/
├── src/
│   ├── cli.js              # Main CLI orchestrator
│   ├── core/
│   │   └── idea-manager.js # Idea storage and Max Heap logic
│   ├── ui/
│   │   ├── splash.js       # ASCII art and animations
│   │   ├── prompts.js      # Interactive prompts
│   │   ├── display.js      # Beautiful output formatting
│   │   └── theme.js        # Theme management
│   └── demo/
│       └── demo.js         # Demo mode with sample data
├── index.js                # CLI entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Future Enhancements

- [ ] Export ideas to various formats (JSON, CSV, Markdown)
- [ ] Integration with project management tools
- [ ] Team collaboration features
- [ ] Advanced analytics and insights
- [ ] Custom scoring algorithms
- [ ] Calendar integration for timeboxing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own ideas!

---

**Built with ❤️ for productive developers**

*Prioritize Ideas. Maximize Output. Stay Sane.* 