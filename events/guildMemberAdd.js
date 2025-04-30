const db = require('../handlers/mysqlhandler');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const joinRoles = await db.query(
      'SELECT * FROM roles WHERE guildID = ?',
      [member.guild.id],
    );
    if (!joinRoles || joinRoles.length === 0) return;

    if (!member.guild.me.permissions.has('ManageRoles')) {
      return member.send('**ERROR**: I do not have permission to manage roles.');
    }

    for (const row of joinRoles) {
      const roleId = row.role_id;
      const welcomeRole = member.guild.roles.cache.get(roleId);
      if (!welcomeRole) continue;
      if (member.roles.cache.has(roleId)) continue;
      await member.roles.add(welcomeRole);
    }
  },
};
