import { SplashScreen } from './ui/splash.js';
import { DirectoryScanner } from './core/directory-scanner.js';
import { PromptManager } from './ui/prompts.js';
import { DisplayManager } from './ui/display.js';
import chalk from 'chalk';

export class VindexCLI {
  constructor() {
    this.splash = new SplashScreen();
    this.scanner = new DirectoryScanner();
    this.prompts = new PromptManager();
    this.display = new DisplayManager();
  }

  async run() {
    try {
      // Show splash screen
      await this.splash.show();

      // Ask for directory
      const directory = await this.prompts.getDirectoryInput();
      
      // Scan directory for vindex_input.json files
      const projects = await this.scanner.scanDirectory(directory);
      
      if (projects.length === 0) {
        this.display.showWarning('No vindex_input.json files found in subdirectories.');
        return;
      }

      // Collect scores for each project
      const scoredProjects = [];
      
      for (const project of projects) {
        console.log(chalk.cyan.bold(`\n📁 ${project.name}`));
        this.display.showProjectBox(project);
        
        const scores = await this.prompts.getProjectScores(project.name);
        
        scoredProjects.push({
          ...project,
          ...scores
        });
      }

      // Show loading animation and generate recommendations
      console.log(chalk.cyan.bold('\n🎯 Analyzing your projects...\n'));
      await this.display.showLoadingAnimation();
      
      // Show focus recommendations
      this.display.showFocusRecommendations(scoredProjects);

      // Save results
      await this.scanner.saveResults(directory, scoredProjects);
      
      this.display.showSuccess('✅ Project scores saved successfully!');
      
      // Ask if user wants to open the recommended project in VSCode
      const topProject = scoredProjects.sort((a, b) => {
        const aScore = this.display.analyzeText(a.impact) + this.display.analyzeText(a.passion) + this.display.analyzeText(a.feasibility);
        const bScore = this.display.analyzeText(b.impact) + this.display.analyzeText(b.passion) + this.display.analyzeText(b.feasibility);
        return bScore - aScore;
      })[0];
      
      const shouldOpenVSCode = await this.prompts.askToOpenInVSCode();
      
      if (shouldOpenVSCode) {
        await this.display.openInVSCode(topProject.path, topProject.name);
        
        // Ask if user wants to do anything with status
        const statusAction = await this.prompts.askForStatusAction(topProject.path, topProject.name);
        
        switch (statusAction) {
          case 'view_status':
            await this.display.showProjectStatus(topProject.path, topProject.name);
            break;
          case 'trigger_check':
            await this.display.triggerStatusCheck(topProject.path, topProject.name);
            break;
          case 'continue':
          default:
            console.log(chalk.gray('✨ Happy coding!'));
            break;
        }
      }
      
    } catch (error) {
      console.error('❌ An error occurred:', error.message);
      process.exit(1);
    }
  }


} 