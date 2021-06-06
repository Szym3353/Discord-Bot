const getU = require('./getUser');
const{Discord, client, prefix, admin_role, moderator_role, IdLogi} = require('../variables');
module.exports ={
    name: 'kick',
    description: 'No do wywalenia kogos no',
    execute(message, args, Discord){
        const member = message.mentions.users.first();

        if(message.member.roles.cache.some(r => r.name === admin_role) || message.member.roles.cache.some(r => r.name === moderator_role)){
            if (args[0]) {
                const user = getU.getUserFromMention(args[0]);
                if(!user){
                    return message.reply('Nie ma kogoś takiego :thinking:');
                }else{
                    if(member){
                        const kickEmbed = new Discord.MessageEmbed()
                            .setColor("#cd0000")
                            .setTitle("Wyrzucono")
                            .setDescription(`Użytkownik **${user.username}** został wywalony na zbity ryj... to chyba dobrze?`)
                            .setFooter(`Przez: ${message.member.user.username}`)
                        let memberTarget = message.guild.members.cache.get(member.id);
                        //memberTarget.kick();
                        message.channel.send(kickEmbed);
                        var d = new Date();
                        console.log(`${user.username} został wyrzucony z serwera przez ${message.member.user.username}. ${d.getDate()}.${(d.getMonth() + 1)}.${d.getFullYear()}. ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
                        client.channels.cache.get(IdLogi).send(`**${user.username}** został wyrzucony z serwera przez **${message.member.user.username}**.   *${d.getDate()}.${(d.getMonth() + 1)}.${d.getFullYear()}. ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}*`);
                    }
                }
            }else{
                return message.channel.send("Poprawne użycie: **tost!kick @nazwa_użytkownika**");
            }
        }else{
            message.channel.send("Nie ruszaj co nie możesz :angry:");
        }

    }
}