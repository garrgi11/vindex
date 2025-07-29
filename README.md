# Vindex 🚀

A comprehensive project management and prioritization system with AI-powered feedback analysis.

## 🎯 Features

- **CLI Interface** - Beautiful terminal-based project prioritization tool
- **Frontend** -  web interface
- **AI Feedback Agent** - Intelligent analysis of project progress
- **Status Tracking** - Automated progress monitoring and recommendations

## 📁 Project Structure

```
vindex/
├── cli_interface/          # CLI tool for project prioritization
├── frontend/              # React web application
├── projects/              # Project directories with status tracking
├── feedback_agent.py      # AI-powered feedback analysis
├── setup_feedback_agent.sh # Setup script for AI dependencies
└── README_feedback_agent.md # Feedback agent documentation
```

## 🚀 Quick Start

### 1. CLI Interface
```bash
cd cli_interface
npm install
npm start
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. AI Feedback Agent
```bash
./setup_feedback_agent.sh
```

## 🤖 AI Feedback Agent

The feedback agent automatically analyzes your project status updates and provides intelligent recommendations:

- **Stuck/Boilerplate** → 5-day cooldown
- **Local Deployment** → 2-day cooldown  
- **Live Deployment** → Project retirement

See [README_feedback_agent.md](README_feedback_agent.md) for detailed documentation.

## 📊 Status Tracking

Each project directory contains:
- `vindex_input.json` - Project configuration
- `vindex_status.json` - Progress updates
- `vindex_status_check.sh` - Status check script

## 🛠️ Development

This project combines multiple technologies:
- **Node.js** - CLI and backend services
- **React** - Frontend interface
- **Python** - AI analysis with LangChain
- **OpenAI GPT-4** - Intelligent feedback processing

## 📄 License

MIT License - feel free to use and modify!# vindex
