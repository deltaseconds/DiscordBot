const db = require('../handlers/mysqlhandler');
const { execute } = require('./kick');
module.exports = {
    name: 'roles',
    description: 'Adds join roles role to a server',
    permission: 'MANAGE_ROLES',
    usage: 'roles <add | remove> <role>',
    category: 'moderation',
    async execute(message, args) {
        if(!message.member.permissions.has("manage_roles")) return message.channel.send('**ERROR**: You do not have permission to use this command');
        if(!args[0]) {
            message.channel.send('**ERROR**: Missing arguments; ' + '\n' + 'Usage: roles <add | remove> <role>');
            return;
        }
        if(args[0] === 'add') {
            if(!args[1]) {
                message.channel.send('**ERROR**: Missing arguments');
                return;
            }
            let role = message.guild.roles.cache.find(role => role.id === args[1].slice(3, -1));
            if(!role) {
                message.channel.send('**ERROR**: Role not found');
                return;
            } 
            const roles = await db.query('SELECT * FROM roles WHERE role_id = ? AND guild_id = ?', [role.id, message.guild.id]);
            if(roles[0]) return message.channel.send('**ERROR**: Role already exists');
            await db.query('INSERT INTO roles (role_id, guild_id) VALUES (?, ?)', [role.id, message.guild.id]);
            message.channel.send(`The role ${role.name} has been added to the join roles list`);
        } else if (args[0] === 'remove') {
            if(!args[1]) {
                message.channel.send('**ERROR**: Missing arguments');
                return;
            } 
            let role = message.guild.roles.cache.find(role => role.id === args[1].slice(3, -1));
            if(!role) {
                message.channel.send('**ERROR**: Role not found');
                return;
            } 
            const roles = await db.query('SELECT * FROM roles WHERE role_id = ? AND guild_id = ?', [role.id, message.guild.id]);
            console.log(roles); 
            console.log(role.id);
            if(!roles[0]) return message.channel.send('**ERROR**: Role is not a join role');
            await db.query('DELETE FROM roles WHERE role_id =? AND guild_id =?', [role.id, message.guild.id]);
            message.channel.send(`The role ${role.name} has been removed from the join roles list`);
        } else {
            message.channel.send('**ERROR**: Invalid arguments');
            return;
        }
    }

}