const r = require('better-tord');

module.exports = { 
    name: 'truth',
    description: 'Asks you a question and you have to answer truthfully (PG-13)',
    usage: 'truth',
    category: 'fun',
    cooldown: 5,
    async execute(message, args) {
        const truth = r.get_truth();

        message.channel.send(truth);
    }
};