const db = require('../handlers/mysqlhandler');

module.exports = {
    name: 'evaldb',
    description: 'Executes a database query (Owner only)',
    usage: 'evaldb <query>',
    category: 'owner',
    async execute(message, args) {
        const ownerId = '958818738692571200'; // !!!ATTENTION!!! REPLACE WITH YOUR OWN DISCORD USER ID 

        if (message.author.id !== ownerId) {
            return message.channel.send('**ERROR**: You do not have permission to use this command.');
        }

        if (!args.length) {
            return message.channel.send('**ERROR**: Missing query. Usage: evaldb <query>');
        }

        const query = args.join(' ');

        try {
            const result = await db.query(query);
            message.channel.send(`Query executed successfully:\n\`${JSON.stringify(result, null, 2)}\``);
        } catch (error) {
            console.error(error);
            message.channel.send(`**ERROR**: An error occurred while executing the query:\n\`${error.message}\``);
        }
    },
};