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

# Save status to file
if [ ! -z "$status_update" ]; then
    echo "$(date): $status_update" >> "${projectPath}/vindex_status.log"
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
      const statusLogPath = path.join(projectPath, 'vindex_status.log');
      const statusLog = await fs.readFile(statusLogPath, 'utf8');
      return statusLog.split('\n').filter(line => line.trim()).slice(-5); // Last 5 entries
    } catch (error) {
      return [];
    }
  }

  async saveStatusUpdate(projectPath, status) {
    try {
      const statusLogPath = path.join(projectPath, 'vindex_status.log');
      const timestamp = new Date().toISOString();
      const statusEntry = `${timestamp}: ${status}\n`;
      
      await fs.appendFile(statusLogPath, statusEntry, 'utf8');
      return true;
    } catch (error) {
      console.error('Failed to save status:', error.message);
      return false;
    }
  }
} 