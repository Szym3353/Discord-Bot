const getU = require('./getUser');

module.exports ={
    name: 'avatar',
    description: 'Masz, weź sobie',


    execute(message, args){
        
        if (args[0]) {
            const user = getU.getUserFromMention(args[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone elses avatar.');
            }
    
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
        }
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
    }
}