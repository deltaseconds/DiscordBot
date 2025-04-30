const db = require('../handlers/mysqlhandler');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const joinRoles = await db.query(`SELECT * FROM roles WHERE guildID = ?`, member.guild.id);
        if(joinRoles.length == 0) return;
        joinRoles.forEach(role => {
            let welcomeRole = member.guild.roles.cache.find(rol => rol.id === role.role_id) ? member.guild.roles.cache.find(rol => rol.id === role.role_id) : null;
            if(!welcomeRole) return;
            if(!member.guild.me.permissions.has("MANAGE_ROLES")) return member.send('**ERROR**: I do not have permission to manage roles.');
            if(member.roles.cache.has(welcomeRole.id)) return;
            member.guild.roles.add(welcomeRole);
        });
    }
}