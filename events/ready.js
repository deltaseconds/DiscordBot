const db = require('../handlers/mysqlhandler');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        
        db.initializeConnection()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Database connection error:', err));
    }
};