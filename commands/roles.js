const db = require('../handlers/mysqlhandler');
module.exports = {
    name: 'role',
    description: 'Adds join roles role to a server',
    permission: 'MANAGE_ROLES',
    usage: 'role <add | remove> <role>',
    category: 'moderation',

}