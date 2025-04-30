const db = require('../handlers/mysqlhandler');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const joinRoles = await db.query(
      'SELECT * FROM roles WHERE guild_id = ?',
      [member.guild.id],
    );
    if (!joinRoles || joinRoles.length === 0) return;

    for (const row of joinRoles) {
      const { role_id } = row;
      const welcomeRole = member.guild.roles.cache.get(role_id);

      if (!welcomeRole) {
        await db.query(
          'DELETE FROM roles WHERE guild_id = ? AND role_id = ?',
          [member.guild.id, role_id],
        );
        console.log(`Gelöschte DB-Entry für fehlende Rolle ${role_id}`);
        continue;
      }

      if (member.roles.cache.has(role_id)) continue;

      await member.roles.add(welcomeRole);
    }
  },
};
