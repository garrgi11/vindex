import { IdeaManager } from '../core/idea-manager.js';
import { DisplayManager } from '../ui/display.js';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

export class DemoMode {
  constructor() {
    this.ideaManager = new IdeaManager();
    this.display = new DisplayManager();
  }

  async run() {
    console.log(chalk.cyan.bold('\n🎬 Vindex CLI Demo Mode\n'));
    
    // Clear existing data
    await this.ideaManager.clearAllIdeas();
    
    // Add demo ideas
    const demoIdeas = [
      {
        title: 'Build a SaaS to schedule tweets from Notion',
        impact: 9,
        time: 5,
        roi: 8
      },
      {
        title: 'Create a habit tracking app with gamification',
        impact: 7,
        time: 3,
        roi: 6
      },
      {
        title: 'Develop a browser extension for productivity',
        impact: 6,
        time: 2,
        roi: 7
      },
      {
        title: 'Build an AI-powered resume parser',
        impact: 8,
        time: 7,
        roi: 9
      },
      {
        title: 'Create a simple task management tool',
        impact: 5,
        time: 1,
        roi: 4
      }
    ];

    console.log(chalk.gray('📝 Adding demo project ideas...\n'));

    for (const idea of demoIdeas) {
      await this.ideaManager.addIdea(idea);
      console.log(chalk.green(`✅ Added: ${idea.title}`));
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(chalk.cyan.bold('\n📋 Current Ideas:\n'));
    const ideas = await this.ideaManager.getAllIdeas();
    this.display.showIdeasList(ideas);

    console.log(chalk.cyan.bold('\n🧠 Prioritizing ideas using Max Heap...\n'));
    const spinner = this.display.createSpinner('Scoring and sorting ideas...');
    spinner.start();
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    spinner.succeed('✅ Ideas prioritized!');

    const prioritized = await this.ideaManager.prioritizeIdeas();
    this.display.showPrioritizedIdeas(prioritized);

    console.log(chalk.cyan.bold('\n⏰ Timebox Recommendation:\n'));
    const topIdea = prioritized[0];
    this.display.showTimeboxRecommendation(topIdea);

    // Show demo completion
    const completion = chalkAnimation.rainbow('\n🎉 Demo completed! This is how Vindex helps you prioritize and timebox your project ideas.\n');
    await new Promise(resolve => setTimeout(resolve, 3000));
    completion.stop();

    console.log(chalk.gray('\nTo start using Vindex with your own ideas, run:'));
    console.log(chalk.cyan('npm install -g ./cli_interface'));
    console.log(chalk.cyan('vindex'));
    
    console.log(chalk.gray('\nOr run the demo again with:'));
    console.log(chalk.cyan('vindex --demo'));

    console.log(chalk.yellow('\n🚀 Happy building!'));
  }
} 