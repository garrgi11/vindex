import fs from 'fs/promises';
import path from 'path';

export class DirectoryScanner {
  async scanDirectory(directoryPath) {
    try {
      const projects = [];
      const items = await fs.readdir(directoryPath, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          const projectPath = path.join(directoryPath, item.name);
          const vindexFile = path.join(projectPath, 'vindex_input.json');
          
          try {
            const content = await fs.readFile(vindexFile, 'utf8');
            const projectData = JSON.parse(content);
            
            projects.push({
              name: item.name,
              path: projectPath,
              ...projectData
            });
          } catch (error) {
            // Skip directories without vindex_input.json
            continue;
          }
        }
      }
      
      return projects;
    } catch (error) {
      throw new Error(`Failed to scan directory: ${error.message}`);
    }
  }

  async saveResults(directoryPath, scoredProjects) {
    const resultsPath = path.join(directoryPath, 'vindex_results.json');
    const results = {
      timestamp: new Date().toISOString(),
      projects: scoredProjects
    };
    
    await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
  }
} 