require('dotenv').config();
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers
    ]
});

loadCommands(path.join(__dirname, 'commands'));
loadEvents(client, path.join(__dirname, 'events'));

client.once('ready', async () => {
    try {
      const guild = await client.guilds.fetch('1158885281248845925');
      const member = await guild.members.fetch('958818738692571200');
      client.emit('guildMemberAdd', member);
    } catch (error) {
      console.error('Fehler beim Abrufen von Guild oder Member:', error);
    }
  });
client.login(process.env.DISCORD_TOKEN);