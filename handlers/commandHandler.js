const fs = require('fs');
const path = require('path');

const commands = new Map();

function loadCommands(commandsPath) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('name' in command && 'execute' in command) {
            commands.set(command.name, command);
            console.log(`Loaded command: ${command.name}`);
        } else {
            console.warn(`Command at ${filePath} is missing required properties`);
        }
    }
}

function handleCommand(message) {
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command!');
    }
}

module.exports = {
    loadCommands,
    handleCommand,
    commands
};