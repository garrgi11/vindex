import chalkAnimation from 'chalk-animation';

export class SplashScreen {
  constructor() {
    this.logo = `
    __     _____ _   _ ____  _______  __
    \\ \\   / /_ _| \\ | |  _ \\| ____\\ \\/ /
     \\ \\ / / | ||  \\| | | | |  _|  \\  / 
      \\ V /  | || |\\  | |_| | |___ /  \\ 
       \\_/  |___|_| \\_|____/|_____/_/\\_\\
   `;
     }

  async show() {
    // Clear screen
    console.clear();
    
    // Show animated logo
    const rainbow = chalkAnimation.rainbow(this.logo);
    await new Promise(resolve => setTimeout(resolve, 2000));
    rainbow.stop();

    console.log('\n');
  }
} 