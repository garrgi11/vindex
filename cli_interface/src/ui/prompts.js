import inquirer from 'inquirer';
import chalk from 'chalk';

export class PromptManager {
  async getDirectoryInput() {
    const { directory } = await inquirer.prompt([
      {
        type: 'input',
        name: 'directory',
        message: chalk.cyan('📁 Enter the directory path to scan:'),
        validate: (input) => {
          if (input.trim().length === 0) {
            return 'Please enter a directory path';
          }
          return true;
        }
      }
    ]);

    return directory.trim();
  }

  async getProjectScores(projectName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'impact',
        message: chalk.cyan(`🧠 How impactful is "${projectName}"? Describe the potential impact:`),
        validate: (input) => {
          if (input.trim().length === 0) {
            return 'Please describe the impact';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'passion',
        message: chalk.cyan(`❤️ How passionate are you about "${projectName}"? Describe your passion:`),
        validate: (input) => {
          if (input.trim().length === 0) {
            return 'Please describe your passion';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'feasibility',
        message: chalk.cyan(`❤️ How feasible do you think is building "${projectName}"?`),
        validate: (input) => {
          if (input.trim().length === 0) {
            return 'Please wrtie a short answer on feasibility';
          }
          return true;
        }
      }
    ]);

    return answers;
  }

  async askToOpenInVSCode(projectPath) {
    const { openInVSCode } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'openInVSCode',
        message: chalk.cyan(`🚀 Would you like to open this project in VSCode?`),
        default: true
      }
    ]);

    return openInVSCode;
  }
} 