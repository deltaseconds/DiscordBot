const { handleCommand } = require('../handlers/commandHandler');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        // Ignore messages from bots
        if (message.author.bot) return;
        if(message.channel.type != 0) return;
        // Handle commands
        handleCommand(message);

        // Custom message responses
        if (message.content.includes("oi mate")) {
            message.channel.send('oi mate');
        }

        // Special user handling
        if (message.author.id === '958818738692571200') {
            // Add specific behavior for this user if needed
        }
    }
};