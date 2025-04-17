const db = require('../handlers/mysqlhandler');

module.exports = {
    name: 'level',
    description: 'Check your level and xp',
    usage: 'level [@user]',
    category: 'level',
    async execute(message, args) {
        let user = message.mentions.users.first() || message.author;

        const guildData = await db.query('SELECT * FROM guilds WHERE id =?', message.guild.id);
        if(!guildData) return;
        if(parseInt(guildData[0].levelsystem) === 0) return message.channel.send("This server does not have the levelsystem enabled. Would you like to activate it? !settings levelsystem on");

        let userData = await db.query('SELECT * FROM level WHERE user_id =? AND guild_id =?', [user.id, message.guild.id]);
        
    }
}