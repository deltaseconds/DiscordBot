module.exports = {
    name: 'translate',
    description: 'Translates text to a different language',
    usage: 'translate <target language> <text>',
    category: 'utility',
    cooldown: 5,
    async execute(message, args) {
        // Check for required arguments
        if (args.length < 2) {
            return message.channel.send('**ERROR**: Missing arguments. Usage: !translate <target language> <text>');
        }

        const targetLang = args[0].toLowerCase();
        const textToTranslate = args.slice(1).join(' ');
        
        // LibreTranslate API endpoint (using public instance)
        const apiUrl = 'https://libretranslate.com/translate';
        
        // Map of supported languages codes and names
        const languages = {
            'en': 'English',
            'ar': 'Arabic',
            'zh': 'Chinese',
            'fr': 'French',
            'de': 'German',
            'hi': 'Hindi',
            'id': 'Indonesian',
            'ga': 'Irish',
            'it': 'Italian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'pl': 'Polish',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'es': 'Spanish',
            'sv': 'Swedish',
            'tr': 'Turkish',
            'vi': 'Vietnamese'
        };
        
        // Check if target language is supported
        if (!Object.keys(languages).includes(targetLang)) {
            let supportedLangsMsg = `**ERROR**: Invalid language code. Supported language codes are:\n`;
            for (const [code, name] of Object.entries(languages)) {
                supportedLangsMsg += `\`${code}\` - ${name}\n`;
            }
            return message.channel.send(supportedLangsMsg);
        }
        
        // Send a "translating" message since the API request might take time
        const loadingMsg = await message.channel.send(`🔄 Translating to ${languages[targetLang]}...`);
        
        try {
            // Prepare the request payload
            const payload = {
                q: textToTranslate,
                source: "auto", // Auto-detect source language
                target: targetLang
            };
            
            // Make the fetch request
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.translatedText) {
                // Edit the loading message to show the translation
                await loadingMsg.edit(`🌐 **Translation to ${languages[targetLang]}:**\n${data.translatedText}`);
            } else {
                throw new Error('No translation returned');
            }
        } catch (error) {
            console.error('Translation error:', error);
            await loadingMsg.edit(`❌ **Translation failed**: ${error.message || 'Unknown error occurred'}`);
        }
    }
};
