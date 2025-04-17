const { category } = require("./roles");

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8ball a question',
    usage: '<question>', 
    category: 'fun',
    execute(message, args) {
       if(!args[0]) {
        return message.channel.send("Ask a question, will you?");
       } 
       const responses = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes, definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful",
        "No",
        'FUCK NO',
        'NO',
        'NOPE',
        'NOPE NOPE NOPE',
        'potentially',
        'maybe',
        'probably',
        'probably not',
        'probably yes',
        'in a distant time maybe',
        'in a distant time yes',
        'in a distant time no',
        'in a distant time potentially',
        'in a distant time maybe not',
        'in a distant time maybe yes',
        'in a distant time potentially yes though it is still highly unlikely in every case and it is not recommended to rely on it',
        
       ]
       const response = responses[Math.floor(Math.random() * responses.length)];
       message.channel.send(response);
    }

}