import chalk from 'chalk';
import boxen from 'boxen';
import ora from 'ora';
import { exec } from 'child_process';
import { promisify } from 'util';
import { StatusChecker } from '../core/status-checker.js';

const execAsync = promisify(exec);

export class DisplayManager {
  constructor() {
    this.statusChecker = new StatusChecker();
  }

  showSuccess(message) {
    console.log(chalk.green('✅ ' + message));
  }

  showWarning(message) {
    console.log(chalk.yellow('⚠️ ' + message));
  }

  showError(message) {
    console.log(chalk.red('❌ ' + message));
  }

  showProjectBox(project) {
    const box = boxen(
      `${chalk.bold(project.name)}\n\n` +
      `${chalk.gray('Description:')} ${project.description}\n` +
      `${chalk.gray('Technology:')} ${project.technology}\n` +
      `${chalk.gray('Progress:')} ${project.progress}\n` +
      `${chalk.gray('Created:')} ${project.dateCreated}\n` +
      `${chalk.gray('Estimated Time:')} ${project.estimatedTime}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    );
    console.log(box);
  }

  async showLoadingAnimation() {
    // Show initial message
    console.log(chalk.cyan('  🤖 AI is analyzing your projects...\n'));
    
    // Simulate processing time with ChatGPT-like blob animation
    await this.showBlobAnimation();
    
    console.log(chalk.green('  ✅ Analysis complete! 🎯\n'));
  }

  async showBlobAnimation() {
    const frames = [
      '⠋',
      '⠙', 
      '⠹',
      '⠸',
      '⠼',
      '⠴',
      '⠦',
      '⠧',
      '⠇',
      '⠏'
    ];
    
    const messages = [
      'Analyzing project impact...',
      'Evaluating your passion levels...',
      'Assessing technical feasibility...',
      'Calculating priority scores...',
      'Generating personalized recommendations...'
    ];
    
    let frameIndex = 0;
    let messageIndex = 0;
    const startTime = Date.now();
    const duration = 3000; // 3 seconds
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Update message every 600ms
      if (Math.floor(elapsed / 600) > messageIndex && messageIndex < messages.length - 1) {
        messageIndex++;
      }
      
      // Clear line and show animation
      process.stdout.write(`\r  ${chalk.cyan(frames[frameIndex])} ${chalk.gray(messages[messageIndex])} ${chalk.yellow(Math.round(progress * 100))}%`);
      
      frameIndex = (frameIndex + 1) % frames.length;
      
      if (elapsed >= duration) {
        clearInterval(interval);
        process.stdout.write('\n');
      }
    }, 80);
    
    await new Promise(resolve => setTimeout(resolve, duration));
  }

  showFocusRecommendations(scoredProjects) {
    console.log(chalk.cyan.bold('\n🎯 FOCUS RECOMMENDATION\n'));
    
    // Sort projects by a simple scoring algorithm
    const prioritizedProjects = scoredProjects.map(project => {
      // Simple scoring: higher impact + passion + feasibility = better score
      const impactScore = this.analyzeText(project.impact);
      const passionScore = this.analyzeText(project.passion);
      const feasibilityScore = this.analyzeText(project.feasibility);
      
      const totalScore = impactScore + passionScore + feasibilityScore;
      
      return {
        ...project,
        totalScore
      };
    }).sort((a, b) => b.totalScore - a.totalScore);

    // Show only the top recommendation
    const topProject = prioritizedProjects[0];
    const score = Math.round((topProject.totalScore / 30) * 100); // Normalize to 100
    
    const box = boxen(
      `${chalk.bold('🎯 RECOMMENDED FOCUS')}\n\n` +
      `${chalk.cyan.bold(topProject.name)}\n\n` +
      `${chalk.gray('Priority Score:')} ${chalk.cyan.bold(score)}/100\n` +
      `${chalk.gray('Impact:')} ${this.getScoreEmoji(topProject.impact)} ${topProject.impact}\n` +
      `${chalk.gray('Passion:')} ${this.getScoreEmoji(topProject.passion)} ${topProject.passion}\n` +
      `${chalk.gray('Feasibility:')} ${this.getScoreEmoji(topProject.feasibility)} ${topProject.feasibility}\n\n` +
      `${chalk.gray('Technology:')} ${topProject.technology}\n` +
      `${chalk.gray('Estimated Time:')} ${topProject.estimatedTime}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    );
    
    console.log(box);

    // Show focus recommendation details
    console.log(chalk.green.bold('\n💡 WHY THIS PROJECT?\n'));
    
    const focusBox = boxen(
      `${chalk.gray('Analysis:')}\n` +
      `• Highest combined score of ${score}/100\n` +
      `• Strong alignment with your impact goals\n` +
      `• High personal passion and feasibility\n\n` +
      `${chalk.gray('Next Steps:')}\n` +
      `• Start with ${topProject.technology}\n` +
      `• Allocate ${topProject.estimatedTime} for development\n` +
      `• Break down into smaller milestones\n\n` +
      `${chalk.gray('Motivation:')}\n` +
      `🚀 This project has the best balance of impact, passion, and feasibility!\n` +
      `💡 Perfect for maximizing your productivity and satisfaction.`,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        backgroundColor: 'black'
      }
    );
    
    console.log(focusBox);
    
    // Show additional insights
    console.log(chalk.cyan.bold('\n📊 INSIGHTS:\n'));
    console.log(chalk.gray('• Focus on execution rather than overthinking'));
    console.log(chalk.gray('• Start small and iterate based on feedback'));
    console.log(chalk.gray('• Set clear milestones and track progress'));
    
    console.log(chalk.green.bold('\n✨ Ready to build something amazing! 🚀\n'));
  }

  // Helper method to analyze text sentiment/enthusiasm
  analyzeText(text) {
    if (!text) return 5; // Default score
    
    const lowerText = text.toLowerCase();
    let score = 5; // Base score
    
    // Positive indicators
    if (lowerText.includes('high') || lowerText.includes('great') || lowerText.includes('excellent')) score += 2;
    if (lowerText.includes('love') || lowerText.includes('passionate') || lowerText.includes('excited')) score += 2;
    if (lowerText.includes('easy') || lowerText.includes('simple') || lowerText.includes('quick')) score += 1;
    if (lowerText.includes('impact') || lowerText.includes('valuable') || lowerText.includes('useful')) score += 2;
    
    // Negative indicators
    if (lowerText.includes('low') || lowerText.includes('difficult') || lowerText.includes('hard')) score -= 1;
    if (lowerText.includes('not sure') || lowerText.includes('maybe') || lowerText.includes('uncertain')) score -= 1;
    
    return Math.max(1, Math.min(10, score)); // Clamp between 1-10
  }

  // Helper method to get emoji based on score
  getScoreEmoji(text) {
    const score = this.analyzeText(text);
    if (score >= 8) return '🔥';
    if (score >= 6) return '⭐';
    if (score >= 4) return '👍';
    return '🤔';
  }

  async openInVSCode(projectPath, projectName = 'Project') {
    try {
      console.log(chalk.cyan('🚀 Opening project in VSCode...'));
      await execAsync(`code "${projectPath}"`);
      this.showSuccess('✅ Project opened in VSCode!');
      
      // Schedule status check for 30 seconds
      await this.statusChecker.scheduleStatusCheck(projectPath, projectName);
      
    } catch (error) {
      this.showError('❌ Failed to open VSCode. Make sure VSCode is installed and the "code" command is available in your PATH.');
      console.log(chalk.gray('💡 You can manually open the project by running: code "' + projectPath + '"'));
    }
  }

  async showProjectStatus(projectPath, projectName) {
    const statusEntries = await this.statusChecker.getProjectStatus(projectPath);
    
    if (statusEntries.length === 0) {
      console.log(chalk.gray('📝 No status updates found for this project.'));
      return;
    }

    console.log(chalk.cyan.bold(`\n📊 Status History for ${projectName}:\n`));
    
    statusEntries.forEach((entry, index) => {
      const [timestamp, ...statusParts] = entry.split(': ');
      const status = statusParts.join(': ');
      const date = new Date(timestamp).toLocaleString();
      
      console.log(chalk.gray(`${date}:`));
      console.log(chalk.white(`  ${status}\n`));
    });
  }

  async triggerStatusCheck(projectPath, projectName) {
    console.log(chalk.cyan('🔔 Triggering status check now...'));
    await this.statusChecker.showStatusPopup(projectPath, projectName);
  }
} 