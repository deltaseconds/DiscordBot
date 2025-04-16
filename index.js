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

client.login(process.env.DISCORD_TOKEN);