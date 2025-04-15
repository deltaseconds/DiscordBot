module.exports = {
    name: '8ball',
    description: 'Ask the magic 8ball a question',
    usage: '<question>', 
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
        'nein',
        'nein nein nein',
        'はい、確かに', // Yes, certainly
        'その通りです', // That's right
        '間違いなく', // Without a doubt
        'もちろんです', // Of course
        'そう思います', // I think so
        'たぶんそうです', // Probably so
        'いいえ', // No
        'だめです', // No good
        'それは違います', // That's wrong
        'あり得ません', // Impossible
        'わかりません', // I don't know
        'もう一度聞いてください', // Please ask again
        '後で聞いてください', // Ask me later
        '今は答えられません', // Can't answer now
        'それは秘密です', // That's a secret
        'まだ分かりません', // Don't know yet
        'おそらく', // Perhaps
        '可能性はあります', // There's a possibility
        '期待しないでください', // Don't count on it
        '見込みは薄いです', // Prospects are slim
        'いつか分かるでしょう', // You'll know someday
        'それは運次第です', // It depends on luck
        'まだ時期尚早です', // It's too early to tell
        'それは難しいですね', // That's difficult
        'がんばって！', // Good luck!
       ]
       const response = responses[Math.floor(Math.random() * responses.length)];
       message.channel.send(response);
    }

}