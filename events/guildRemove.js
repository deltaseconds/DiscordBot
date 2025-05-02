module.exports = {
    name: 'guildRemove',
    once: true,
    async execute(guild) {
        const db = require('../handlers/mysqlhandler');
        await db.query('DELETE FROM guilds WHERE id = ?', [guild.id]);
        await db.query('DELETE FROM levels WHERE guild_id = ?', [guild.id]);
        await db.query('DELETE FROM levels_settings WHERE guild_id = ?', [guild.id]);
        await db.query('DELETE FROM levels_embed_fields WHERE guild_id = ?', [guild.id]);
        await db.query('DELETE FROM roles WHERE guild_id = ?', [guild.id]);
        console.log(`Removed ${guild.name} from the database`);
    }
}