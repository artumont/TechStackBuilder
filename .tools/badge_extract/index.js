const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');

class BadgeExtractor {
    constructor() {
        this.badges = {};
        this.outputPath = path.join(__dirname, 'tech-stack.json');
    }

    async start() {
        const action = await this.showMainMenu();
        await this.handleAction(action);
    }

    async showMainMenu() {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { name: 'Extract badges from local README', value: 'local' },
                    { name: 'Extract badges from GitHub raw URL', value: 'github' },
                    { name: 'View current badges', value: 'view' },
                    { name: 'Change output location', value: 'output' },
                    { name: 'Exit', value: 'exit' }
                ]
            }
        ]);
        return action;
    }

    async handleAction(action) {
        try {
            switch (action) {
                case 'local':
                    await this.handleLocalExtraction();
                    break;
                case 'github':
                    await this.handleGitHubExtraction();
                    break;
                case 'view':
                    await this.viewBadges();
                    break;
                case 'output':
                    await this.changeOutputLocation();
                    break;
                case 'exit':
                    console.log(chalk.blue('\nGoodbye! 👋'));
                    return;
            }
            // Show menu again after action completes
            await this.start();
        } catch (error) {
            console.error(chalk.red('Error:'), error.message);
            await this.start();
        }
    }

    async handleLocalExtraction() {
        const readmePath = path.join(__dirname, './README.md');
        if (!fs.existsSync(readmePath)) {
            throw new Error('README.md not found');
        }
        const content = fs.readFileSync(readmePath, 'utf8');
        this.badges = this.parseBadges(content);
        await this.saveBadges();
        console.log(chalk.green('\n✔ Successfully extracted badges from local README'));
    }

    async handleGitHubExtraction() {
        const { url } = await inquirer.prompt([
            {
                type: 'input',
                name: 'url',
                message: 'Enter the GitHub raw content URL:',
                validate: (input) => {
                    return input.startsWith('https://raw.githubusercontent.com') || 
                           'Please enter a valid GitHub raw content URL';
                }
            }
        ]);

        try {
            const response = await axios.get(url);
            this.badges = this.parseBadges(response.data);
            await this.saveBadges();
            console.log(chalk.green('\n✔ Successfully extracted badges from GitHub URL'));
        } catch (error) {
            throw new Error(`Failed to fetch GitHub content: ${error.message}`);
        }
    }

    async viewBadges() {
        try {
            if (fs.existsSync(this.outputPath)) {
                const badges = JSON.parse(fs.readFileSync(this.outputPath, 'utf8'));
                console.log('\nCurrent badges:');
                Object.entries(badges).forEach(([name, url]) => {
                    console.log(chalk.cyan(`\n${name}:`));
                    console.log(url);
                });
            } else {
                console.log(chalk.yellow('\nNo badges file found. Extract some badges first!'));
            }
        } catch (error) {
            throw new Error(`Failed to read badges: ${error.message}`);
        }
    }

    async changeOutputLocation() {
        const { newPath } = await inquirer.prompt([
            {
                type: 'input',
                name: 'newPath',
                message: 'Enter new output path (relative to badge_extract folder):',
                default: 'badges.json'
            }
        ]);

        this.outputPath = path.join(__dirname, newPath);
        console.log(chalk.green(`\n✔ Output location changed to: ${this.outputPath}`));
    }

    parseBadges(content) {
        const badgeRegex = /https:\/\/img\.shields\.io\/badge\/([^-]+)-[^?\s]+/g;
        const badges = {};
        
        let match;
        while ((match = badgeRegex.exec(content)) !== null) {
            const name = decodeURIComponent(match[1]);
            badges[name] = match[0];
        }

        return badges;
    }

    async saveBadges() {
        const dir = path.dirname(this.outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(this.outputPath, JSON.stringify(this.badges, null, 2));
    }
}

const extractor = new BadgeExtractor();
extractor.start().catch(error => {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
});
