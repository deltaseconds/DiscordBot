const db = require('../handlers/mysqlhandler');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const joinRoles = await db.query(`SELECT * FROM roles WHERE guildID = ?`, member.guild.id);
        if(joinRoles.length == 0) return;
        joinRoles.forEach(role => {
            let welcomeRole = member.guild.roles.cache.find(rol => rol.id === role.role_id);
            member.guild.roles.add(welcomeRole);
        });
    }
}