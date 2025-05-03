const { handleCommand } = require('../handlers/commandHandler');
const db = require('../handlers/mysqlhandler');
const levelList = require('../levels.json');
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        
        if (message.author.bot) return;
        if(message.channel.type != 0) return;

        handleCommand(message);

        if (message.content.includes("oi mate")) {
            message.channel.send('oi mate');
        }

        if (message.author.id === '958818738692571200') {
        
        }
        const guilds = await db.query('SELECT * FROM guilds WHERE id = ?', [message.guild.id]);
        const guild = guilds[0];
        if(!guild) return await db.query('INSERT INTO guilds (id) VALUES (?)', [message.guild.id]);
        

        const levelData = await db.query('SELECT * FROM levels WHERE guild_id =? AND member_id =?', [message.guild.id, message.author.id]);
        if(!levelData[0]) {
            await db.query('INSERT INTO levels (guild_id, member_id, level, xp) VALUES (?,?,?,?)', [message.guild.id, message.author.id, 1, 0]);
        } else {
            const level = parseInt(levelData[0].level);
            const xp = parseInt(levelData[0].xp);
            const totalXP = parseInt(levelData[0].total_xp);
            const xpNeeded = levelList[level + 1];
            const addXP = Math.floor(Math.random() * 10) + 1;
            await db.query('UPDATE levels SET xp =?, total_xp =? WHERE guild_id =? AND member_id =?', [xp + addXP, totalXP + addXP, message.guild.id, message.author.id]);
            if(xpNeeded <= xp) {
                await db.query('UPDATE levels SET level =?, xp =? WHERE guild_id =? AND member_id =?', [level + 1, 0, message.guild.id, message.author.id]);
                message.channel.send(`${message.author} has leveled up to level ${level + 1}`); 
            }
        }
    }
};