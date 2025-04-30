
const db = require('../handlers/mysqlhandler');
module.exports = {
    name: 'settings',
    description: 'Manage server settings',
    permission: 'MANAGE_GUILD',
    aliases: ['set', 'config'],
    cooldown: 5,
    args: true,
    usage: '[option] [value]',
    category: 'settings',
    async execute(message, args) {
        const guildData = await db.query('SELECT * FROM guilds WHERE id =?', [message.guild.id]);
        if (!guildData) return;
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send('**ERROR**: Insufficient permissions');
        if (args[0] === 'levelsystem') {
            if (args[1] === 'on') {
                await db.query('UPDATE guilds SET levelsystem = 1 WHERE id = ?', [message.guild.id]);
                message.channel.send('Level system has been enabled.');
            } else if (args[1] === 'off') {
                await db.query('UPDATE guilds SET levelsystem = 0 WHERE id = ?', [message.guild.id]);
                message.channel.send('Level system has been disabled.');
            } else {
                return message.channel.send('Invalid option. Use `!settings levelsystem on` or `!settings levelsystem off`.');
            }
        } if(args[0] === "roles") {
            if(args[1] === "clear") {
                await db.query('DELETE FROM roles WHERE guild_id = ?', [message.guild.id]);
                message.channel.send('All roles have been cleared.'); 
            } else if(args[1] === "add") {
                const role = message.mentions.roles.first();
                if(!role) return message.channel.send('**ERROR**: Please mention a role to add.');
                const existingRole = await db.query('SELECT * FROM roles WHERE role_id = ? AND guild_id = ?', [role.id, message.guild.id]);
                if(existingRole[0]) return message.channel.send('**ERROR**: This role already exists in the database.');

                await db.query('INSERT INTO roles (guild_id, role_id) VALUES (?, ?)', [message.guild.id, role.id]);
                message.channel.send(`Role ${role.name} has been added.`);
            } else if(args[1] === "remove") {
                const role = message.mentions.roles.first();
                if(!role) return message.channel.send('**ERROR**: Please mention a role to remove.');
                const existingRole = await db.query('SELECT * FROM roles WHERE role_id = ? AND guild_id = ?', [role.id, message.guild.id]);
                if(!existingRole[0]) return message.channel.send('**ERROR**: This role does not exist in the database.');

                await db.query('DELETE FROM roles WHERE role_id = ? AND guild_id = ?', [role.id, message.guild.id]);
                message.channel.send(`Role ${role.name} has been removed.`);
            } else {
                return message.channel.send('Invalid option. Use `!settings roles add @role` or `!settings roles remove @role`.');
            }
        }
        else  {
            message.channel.send('Invalid setting. Use `!settings <levelsystem | roles>`.');
        }
    }
}