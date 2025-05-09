module.exports = {
    name: 'time',
    description: 'Shows the current time in a timezone',
    usage: 'time [timezone] | time list',
    category: 'fun',
    cooldown: 5,
    async execute(message, args) {
        // Check if user wants to see the timezone list
        if (args[0] === 'list') {
            // Get all supported timezones
            const timeZones = Intl.supportedValuesOf('timeZone');
            
            // Define major cities for each region to make the list more manageable
            const majorCities = {
                'Africa': ['Cairo', 'Johannesburg', 'Lagos', 'Nairobi', 'Casablanca'],
                'America': ['New_York', 'Vancouver', 'Chicago', 'Toronto', 'Mexico_City', 'Sao_Paulo', 'Buenos_Aires'],
                'Asia': ['Tokyo', 'Shanghai', 'Dubai', 'Singapore', 'Hong_Kong', 'Delhi', 'Seoul'],
                'Australia': ['Sydney', 'Melbourne', 'Perth', 'Brisbane'],
                'Europe': ['London', 'Berlin', 'Paris', 'Rome', 'Madrid', 'Moscow', 'Istanbul'],
                'Pacific': ['Auckland', 'Honolulu', 'Fiji'],
                'Atlantic': ['Reykjavik'],
                'Indian': ['Maldives'],
                'Antarctica': ['Casey']
            };
            
            // Group timezones by region for better readability
            const regions = {};
            timeZones.forEach(tz => {
                const region = tz.split('/')[0];
                if (!regions[region]) {
                    regions[region] = [];
                }
                regions[region].push(tz);
            });
            
            // Build the message with selected major cities from each region
            let response = '**Available Timezones by Region:**\n\n';
            
            // List major timezones first for convenience
            response += '**Popular Timezones:**\n';
            response += '`UTC`, `Europe/Berlin`, `America/Vancouver`, `America/Toronto`, `Asia/Tokyo`, `Australia/Sydney`\n\n';
            
            // List one major city from each region
            response += '**Major Cities by Region:**\n';
            for (const [region, cities] of Object.entries(majorCities)) {
                if (regions[region]) { // Make sure the region exists
                    const cityList = cities
                        .map(city => {
                            // Find a timezone for this city
                            const timezone = regions[region].find(tz => tz.includes(city));
                            return timezone ? `\`${timezone}\`` : null;
                        })
                        .filter(Boolean) // Remove nulls
                        .join(', ');
                        
                    if (cityList.length > 0) {
                        response += `**${region}**: ${cityList}\n`;
                    }
                }
            }
            
            response += '\n';
            
            // Show how many timezones exist and provide instructions
            response += `There are **${timeZones.length}** timezones available. Use \`!time [timezone]\` to see the time.\n`;
            response += 'To see all timezones in a specific region, use: `!time list [region]`\n\n';
            response += '**Available Regions:**\n';
            response += Object.keys(regions).join(', ');
            
            // Check if user specified a region
            if (args[1]) {
                const region = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
                if (regions[region]) {
                    // For a specific region, list all timezones but organize by major cities first
                    let regionTimezones = regions[region];
                    
                    // If the region has defined major cities, prioritize them
                    if (majorCities[region]) {
                        const majorCityTimezones = [];
                        const otherTimezones = [];
                        
                        regionTimezones.forEach(tz => {
                            const city = tz.split('/').pop().replace(/_/g, ' ');
                            if (majorCities[region].some(majorCity => tz.includes(majorCity))) {
                                majorCityTimezones.push(tz);
                            } else {
                                otherTimezones.push(tz);
                            }
                        });
                        
                        // Only show major cities if there are too many timezones
                        if (regionTimezones.length > 20) {
                            response = `**Major Cities in ${region}:**\n\`${majorCityTimezones.join('`\n`')}\``;
                            response += `\n\nThere are ${otherTimezones.length} more timezones in ${region}. Use \`!time [timezone]\` with a specific timezone.`;
                        } else {
                            response = `**Timezones in ${region}:**\n\`${regionTimezones.join('`\n`')}\``;
                        }
                    } else {
                        response = `**Timezones in ${region}:**\n\`${regionTimezones.join('`\n`')}\``;
                    }
                } else {
                    response = `Region "${args[1]}" not found. Available regions: ${Object.keys(regions).join(', ')}`;
                }
            }
            
            await message.channel.send(response);
            return;
        }
        
        // Get timezone or use UTC as default
        const tz = args[0] || 'UTC';
        
        try {
            // Format current time with the provided timezone
            const now = new Date();
            const formatted = new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
                timeStyle: 'long',
                timeZone: tz
            }).format(now);
            
            // Send the response
            await message.channel.send(`🕒 Time in **${tz}**: ${formatted}`);
        } catch (error) {
            console.error(error);
            await message.channel.send(`❌ Invalid timezone: "${tz}". Try timezones like "UTC", "Europe/London" or "America/New_York". Use \`!time list\` to see all options.`);
        }
    }
}