# Discord Bot

A simple Discord bot built with discord.js.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Discord bot token:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```
4. Start the bot:
   ```bash
   node index.js
   ```

## Features

- Basic command handling
- Responds to '!ping' with 'Pong!'

## Available Commands

- `!ping`: Check if the bot is responsive

## Adding New Commands

To add new commands, modify the message event handler in `index.js`. The bot is set up with basic intents for guild messages and can be expanded with additional functionality as needed.