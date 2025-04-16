const { EmbedBuilder } = require('discord.js');
const { commands } = require('../handlers/commandHandler');

module.exports = {
    name: 'help',
    description: 'Displays information about commands',
    usage: '[category] or [command]',
    category: 'misc',
    execute(message, args) {
        const prefix = '!';
        
        
        const categories = [...new Set(Array.from(commands.values()).map(cmd => cmd.category))];
        
        if (!args.length) {
            const embed = new EmbedBuilder()
                .setColor('#c987ff')
                .setTitle('Help Menu')
                .setDescription(`Use \`${prefix}help <category>\` to view commands in a specific category\nUse \`${prefix}help <command>\` to view detailed information about a specific command`)
                .setTimestamp()
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            categories.forEach(category => {
                if (!category) return; 
                
                const categoryCommands = Array.from(commands.values())
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(', ');
                
                if (categoryCommands) {
                    embed.addFields({ name: `${category.charAt(0).toUpperCase() + category.slice(1)}`, value: categoryCommands });
                }
            });

            return message.channel.send({ embeds: [embed] });
        }

        
        const categoryArg = args[0].toLowerCase();
        if (categories.includes(categoryArg)) {
            const categoryCommands = Array.from(commands.values())
                .filter(cmd => cmd.category === categoryArg);
            
            const embed = new EmbedBuilder()
                .setColor('#c987ff')
                .setTitle(`${categoryArg.charAt(0).toUpperCase() + categoryArg.slice(1)} Commands`)
                .setDescription(`Here are all the commands in the ${categoryArg} category`)
                .setTimestamp()
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            categoryCommands.forEach(cmd => {
                embed.addFields({ 
                    name: `${prefix}${cmd.name} ${cmd.usage ? cmd.usage : ''}`, 
                    value: cmd.description || 'No description provided'
                });
            });

            return message.channel.send({ embeds: [embed] });
        }

        
        const commandName = args[0].toLowerCase();
        const command = commands.get(commandName);
        
        if (command) {
            const embed = new EmbedBuilder()
                .setColor('#c987ff')
                .setTitle(`Command: ${prefix}${command.name}`)
                .setDescription(command.description || 'No description provided')
                .setTimestamp()
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

            if (command.usage) {
                embed.addFields({ name: 'Usage', value: `${prefix}${command.name} ${command.usage}` });
            }
            
            if (command.category) {
                embed.addFields({ name: 'Category', value: command.category });
            }
            
            if (command.permission) {
                embed.addFields({ name: 'Required Permission', value: command.permission });
            }

            return message.channel.send({ embeds: [embed] });
        }

        
        return message.channel.send(`Could not find command or category \`${args[0]}\`. Use \`${prefix}help\` to see all available commands.`);
    }
};