module.exports = {
    name:'ban',
    permission: 'BAN_MEMBERS',
    description: 'Bans a member',
    usage: '<user> [reason]',
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
        if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('**ERROR**: Insufficient permissions');
        const member = message.mentions.members.first();
        if (member) {
            const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : 'No reason provided';
            console.log(reason);
            if(member.permissions.has('BAN_MEMBERS')) return message.channel.send('**ERROR**: You cannot ban this member');
            
            if(member.isBannable()) {
                member.ban(reason).then(() => {
                    message.reply(`${member} has been banned. Reason: ${reason}`); 
                });  
            } else {
                message.reply('**ERROR**: You cannot ban this member');
            }
        } else {
            message.reply('**ERROR**: The provided user does not exist or is not a member of this server.');
        }
    } 
};