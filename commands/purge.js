module.exports = {
    name: 'reset',
    description: 'Erase the guilds data completely to make it from scratch (Server Owner only)',
    usage: 'reset',
    category: 'owner',
    async execute(message, args) {
        if(message.author.id != message.guild.ownerId) {
            return message.channel.send('**ERROR**: You do not have permission to use this command.');
        }
        const db = require('../handlers/mysqlhandler');
        const guildId = message.guild.id;
        const guildName = message.guild.name;
        const guildIcon = message.guild.iconURL({ dynamic: true });
        const guildOwner = message.guild.members.cache.get(message.guild.ownerId);
        const guildOwnerTag = guildOwner ? guildOwner.user.tag : 'Unknown';
        const guildOwnerId = guildOwner ? guildOwner.user.id : 'Unknown';
        const guildOwnerAvatar = guildOwner ? guildOwner.user.displayAvatarURL({ dynamic: true }) : null;
        const guildOwnerAvatarEmbed = guildOwnerAvatar ? `\n[Avatar](${guildOwnerAvatar})` : '';
        const guildOwnerTagEmbed = guildOwner ? `\n**Owner:** ${guildOwnerTag}` : '';
        const guildOwnerIdEmbed = guildOwner ? `\n**Owner ID:** ${guildOwnerId}` : '';
        const guildIconEmbed = guildIcon ? `\n[Icon](${guildIcon})` : '';
        const guildNameEmbed = guildName ? `\n**Name:** ${guildName}` : '';
        const guildIdEmbed = guildId ? `\n**ID:** ${guildId}` : '';
        const guildEmbed = {
            color: 0x0099ff,
            title: 'Guild Information',
            description: `This will erase all data related to the guild ${guildName} (${guildId})`,
            fields: [
                { name: 'Guild Name', value: guildNameEmbed, inline: true },
                { name: 'Guild ID', value: guildIdEmbed, inline: true },
                { name: 'Guild Icon', value: guildIconEmbed, inline: true },
                { name: 'Owner', value: `${guildOwnerTag}${guildOwnerTagEmbed}${guildOwnerIdEmbed}${guildOwnerAvatarEmbed}`, inline: true },
            ],
            timestamp: new Date(),
        };
        const confirmationEmbed = {
            color: 0xff0000,
            title: 'Confirmation',
            description: 'Are you sure you want to erase all data related to this guild?',
            fields: [
                { name: 'Type "yes" to confirm', value: '\u200b' },
            ],
            timestamp: new Date(),
        };
        const confirmationMessage = await message.channel.send({ embeds: [confirmationEmbed] });
        const filter = (response) => {
            return response.author.id === message.author.id && response.content.toLowerCase() === 'yes';
        };
        const collector = confirmationMessage.channel.createMessageCollector({ filter, time: 15000 });
        collector.on('collect', async (response) => {
            await db.query('DELETE FROM guilds WHERE id = ?', [guildId]);
            await db.query('DELETE FROM levels WHERE guild_id = ?', [guildId]);
            await db.query('DELETE FROM levels_settings WHERE guild_id = ?', [guildId]);
            await db.query('DELETE FROM levels_embed_fields WHERE guild_id = ?', [guildId]);
            await db.query('DELETE FROM roles WHERE guild_id = ?', [guildId]);
            confirmationMessage.edit({ embeds: [{ color: 0x00ff00, title: 'Success', description: `All data related to the guild ${guildName} (${guildId}) has been erased.` }] });
            collector.stop();
        });
        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                confirmationMessage.edit({ embeds: [{ color: 0xff0000, title: 'Timeout', description: 'You took too long to respond. The operation has been cancelled.' }] });
            }
        });
        message.channel.send({ embeds: [guildEmbed] });
        message.channel.send('Please confirm the operation by typing "yes" within 15 seconds.');
        
    },
}