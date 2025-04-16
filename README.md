

# Discord Bot Project

A work-in-progress Discord bot with moderation features.

## Current Features

### Role Management
- `/role add <role>` - Adds a role to the join roles list (requires MANAGE_ROLES permission)
- `/role remove <role>` - Removes a role from the join roles list (requires MANAGE_ROLES permission)

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with your bot token and mysql-data:
```
DISCORD_TOKEN=your_bot_token_here
DB_HOST=IP-ADRESS HERE
DB_USERNAME=USERNAME HERE
DB_PASSWORD=PASSWORD HERE
DB_PORT=CHANGE THE PORT IF NEEDED
DATABASE=YOUR DB
BOT_NAME=Change the name of your bot (unused atm)
```
4. Start the bot:
```bash
node index.js or node . if youre lazy like me
```

## Database Setup
The bot currently uses MySQL for storing role information. You'll need to:
1. Set up a MySQL database
2. Create a `roles` table with columns `role_id` and `guild_id`

## Roadmap (Unfinished Features)
- [ ] Add more moderation commands
- [ ] Implement error handling improvements
- [ ] Add join role assignment functionality (WIP ATM)
- [ ] Create proper command documentation 
- [ ] Add configuration system

## Contributing
Contributions are welcome! Since this is an unfinished project, feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License
[MIT](LICENSE) (You may want to create a LICENSE file later)
