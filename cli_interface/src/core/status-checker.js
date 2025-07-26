import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export class StatusChecker {
  constructor() {
    this.statusData = {};
  }

  async scheduleStatusCheck(projectPath, projectName) {
    console.log(chalk.gray('⏰ Status check scheduled for 10 seconds...'));
    console.log(chalk.gray('💡 A clean terminal popup will appear to check your progress!'));
    
    setTimeout(async () => {
      await this.showStatusPopup(projectPath, projectName);
    }, 10000); // 10 seconds
  }

  async showStatusPopup(projectPath, projectName) {
    try {
      // Create a temporary script to show the status popup
      const scriptPath = await this.createStatusScript(projectPath, projectName);
      
      // Open terminal with the status script
      await this.openTerminalWithScript(scriptPath);
      
    } catch (error) {
      console.error('Failed to show status popup:', error.message);
    }
  }

  async createStatusScript(projectPath, projectName) {
    const scriptContent = `#!/bin/bash

# Change to project directory
cd "${projectPath}"

# Clear screen
clear

# Show clean, minimal header
echo "Hey, VINDEX here!"
echo ""
echo "How's the project going? (Press Enter to skip)"
read -r status_update

# Save status to JSON file
if [ ! -z "$status_update" ]; then
    # Create JSON entry
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
    json_entry="{\\"timestamp\\": \\"$timestamp\\", \\"status\\": \\"$status_update\\"}"
    
    # Read existing JSON or create new array
    if [ -f "${projectPath}/vindex_status.json" ]; then
        # Read existing file and add new entry
        python3 -c "
import json
import sys
try:
    with open('${projectPath}/vindex_status.json', 'r') as f:
        data = json.load(f)
except:
    data = []
data.append($json_entry)
with open('${projectPath}/vindex_status.json', 'w') as f:
    json.dump(data, f, indent=2)
"
    else
        # Create new file with first entry
        python3 -c "
import json
data = [$json_entry]
with open('${projectPath}/vindex_status.json', 'w') as f:
    json.dump(data, f, indent=2)
"
    fi
    echo "✅ Thanks!"
fi

echo ""
echo "Press any key to close..."
read -n 1
`;

    const scriptPath = path.join(projectPath, 'vindex_status_check.sh');
    await fs.writeFile(scriptPath, scriptContent, 'utf8');
    await execAsync(`chmod +x "${scriptPath}"`);
    
    return scriptPath;
  }

  async openTerminalWithScript(scriptPath) {
    try {
      // Use macOS Terminal.app to open the script
      await execAsync(`osascript -e 'tell application "Terminal" to do script "${scriptPath}"'`);
    } catch (error) {
      // Fallback: try to open with iTerm2 if available
      try {
        await execAsync(`osascript -e 'tell application "iTerm" to create window with default profile command "${scriptPath}"'`);
      } catch (fallbackError) {
        console.error('Could not open terminal automatically. Please run the status check manually.');
      }
    }
  }

  async getProjectStatus(projectPath) {
    try {
      const statusLogPath = path.join(projectPath, 'vindex_status.json');
      const statusData = await fs.readFile(statusLogPath, 'utf8');
      const statusArray = JSON.parse(statusData);
      return statusArray.slice(-5); // Last 5 entries
    } catch (error) {
      return [];
    }
  }

  async saveStatusUpdate(projectPath, status) {
    try {
      const statusLogPath = path.join(projectPath, 'vindex_status.json');
      const timestamp = new Date().toISOString();
      const statusEntry = {
        timestamp: timestamp,
        status: status
      };
      
      // Read existing data or create new array
      let statusArray = [];
      try {
        const existingData = await fs.readFile(statusLogPath, 'utf8');
        statusArray = JSON.parse(existingData);
      } catch (readError) {
        // File doesn't exist or is empty, start with empty array
        statusArray = [];
      }
      
      // Add new entry
      statusArray.push(statusEntry);
      
      // Write back to file
      await fs.writeFile(statusLogPath, JSON.stringify(statusArray, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('Failed to save status:', error.message);
      return false;
    }
  }
} 