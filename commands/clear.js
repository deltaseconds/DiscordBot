module.exports = {
    name: 'clear',
    description: 'Clear a number of messages',
    permission: 'MANAGE_MESSAGES',
    usage: 'clear <number of messages>',
    category: 'moderation',
    execute(message, args) {
        if(!message.member.permissions.has(permission) || !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**ERROR**: You do not have permission to use this command.');
       if (!args[0]) return message.channel.send('**ERROR**: Please specify the number of messages to delete.');
       if (isNaN(args[0])) return message.channel.send('**ERROR**: Please provide a valid number.');
       if (args[0] > 100) return message.channel.send('**ERROR**: You cannot delete more than 100 messages at once.');
       if (args[0] < 1) return message.channel.send('**ERROR**: You must delete at least 1 message.');
       message.channel.bulkDelete(args[0]).then(() => {
        //    message.channel.send(`**SUCCESS**: Cleared ${args[0]} messages.`).then(msg => {
        //        msg.delete({ timeout: 5000 });
        //    });
           message.channel.messages.fetch({ limit: args[0] }).then(messages => {
              messages.forEach(element => {
                console.log(element); // log the message object t
                message.delete(element);
              }); 
           })
       });
    }
}