const db = require('../handlers/mysqlhandler');
const levels = require('../levels.json');

module.exports = {
    name: 'level',
    description: 'Check your level and xp',
    usage: 'level [@user]',
    category: 'level',
    async execute(message, args) {
        let user = message.mentions.users.first() || message.author;

        const guildData = await db.query('SELECT * FROM guilds WHERE id =?', [message.guild.id]);
        if(!guildData) return;
        if(parseInt(guildData[0].levelsystem) === 0) return message.channel.send("This server does not have the levelsystem enabled. Would you like to activate it? !settings levelsystem on");

        let userData = await db.query('SELECT * FROM levels WHERE member_id =? AND guild_id =?', [user.id, message.guild.id]);
        const Canvas = require("modern-rank-card");
        const { AttachmentBuilder } = require("discord.js");
        if(userData[0]) {
            let image = await new Canvas.RankCard()
            .setAddon("xp", false)
            .setAddon("rank", false)
            .setAddon("color", true)
            .setAvatar(message.author.displayAvatarURL({ extension: "png" }))
            .setUsername(message.author.username)
            .setLevel(parseInt(userData[0].level))
            .setXP("current", parseInt(userData[0].xp))
            .setXP("needed", levels[parseInt(userData[0].level) + 1])
            .setColor("level", "#ffffff")
            .setBackground("https://i.imgur.com/hwgvX0t.png")
            .toAttachment();
    
            let attachment = new AttachmentBuilder(image.toBuffer(), { name: "rank.png" });
    
            message.channel.send({ file: [attachment] });
        }
        
    }
}