import chalk from 'chalk';

export class ThemeManager {
  constructor() {
    this.currentTheme = 'default';
    this.themes = {
      default: {
        primary: 'cyan',
        secondary: 'gray',
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'blue'
      },
      dark: {
        primary: 'cyan',
        secondary: 'gray',
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'blue'
      },
      light: {
        primary: 'blue',
        secondary: 'gray',
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'cyan'
      }
    };
  }

  setDark() {
    this.currentTheme = 'dark';
    // In a real implementation, you might want to adjust terminal colors
    console.log(chalk.gray('🌙 Dark theme activated'));
  }

  setLight() {
    this.currentTheme = 'light';
    console.log(chalk.gray('☀️ Light theme activated'));
  }

  getColor(type) {
    return this.themes[this.currentTheme][type] || 'white';
  }

  primary(text) {
    return chalk[this.getColor('primary')](text);
  }

  secondary(text) {
    return chalk[this.getColor('secondary')](text);
  }

  success(text) {
    return chalk[this.getColor('success')](text);
  }

  warning(text) {
    return chalk[this.getColor('warning')](text);
  }

  error(text) {
    return chalk[this.getColor('error')](text);
  }

  info(text) {
    return chalk[this.getColor('info')](text);
  }
} 