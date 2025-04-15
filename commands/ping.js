module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    category: 'misc',
    execute(message, args) {
        message.reply('Pong!');
    }
};