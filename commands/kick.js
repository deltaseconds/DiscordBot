module.exports = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    permission: 'KICK_MEMBERS',
    usage: '<user> [reason]',
    category: 'moderation',
    execute(message, args) {
        const mentionRegex = /^<@!?(\d{17,20})>$/;
        const input = args[0] ? args[0] : '';
        const match = input.match(mentionRegex);
        if(!args[0]) {
            message.channel.send('**ERROR**: Missing arguments');
            return;
        } 
        if(match) {
            const userId = match[1];
            args[0] = userId;
        }
        let target = message.guild.members.cache.find(member => member.id === args[0]);
        if(!target) {
            message.channel.send('**ERROR**: The provided user does not exist or is not a member of this server.');
            return;
        }
        if(!message.member.permissions.has(permission)) return message.channel.send('**ERROR**: Insufficient permissions');
        const member = message.mentions.members.first();
        if (member) {
            const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : 'No reason provided';
            console.log(reason);
            if(member.permissions.has('KICK_MEMBERS')) return message.channel.send('**ERROR**: You cannot kick this member');
            
            if(member.iskickable()) {
                member.kick(reason).then(() => {
                    message.reply(`${member} has been kicked. Reason: ${reason}`); 
                });  
            } else {
                message.reply('**ERROR**: You cannot kick this member');
            }
        } else {
            message.reply('**ERROR**: The provided user does not exist or is not a member of this server.');
        }
    }

}