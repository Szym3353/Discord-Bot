const { joinLeft, activityRole1, basicColor, categoryGame, categoryOther, categoryRole } = require(__dirname + '/../config/config.js');
const { Discord } = require("../../variables")
module.exports = (client) => {

    client.on("guildMemberAdd", (member) => {
        member.roles.add(member.guild.roles.cache.find(r => r.id === basicColor));
        member.roles.add(member.guild.roles.cache.find(r => r.id === activityRole1));
        member.roles.add(member.guild.roles.cache.find(r => r.id === categoryRole));
        member.roles.add(member.guild.roles.cache.find(r => r.id === categoryGame));
        member.roles.add(member.guild.roles.cache.find(r => r.id === categoryOther));
        const joinEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.username}`)
            .setTitle(`Witaj na serwerze!`)
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor("#89e322")
            //.addFields("=> Nie mamy tu specjalnego regulaminu, nie bądź chamem i będzie ok\n=> Możesz podobierać sobie role na kanale pod tym, baw sie dobrze.")
            .addFields(
                { name: '\u200B', value: 'Zachęcam do dodania sobie roli na kanale niżej'},
                { name: '\u200B', value: 'Nie mamy tu regulaminu, zwyczajnie nie bądź chamem i nie prowokuj ludzi a będzie dobrze c:' },
                { name: '\u200B', value: '\u200B' },
            )
            .setImage('https://i.pinimg.com/originals/1b/4c/e4/1b4ce4120e8ab274eaab273f805a2401.gif')
            .setFooter('Miłego dnia życzę')
        client.channels.cache.get(joinLeft).send(`${member.user}`);
        client.channels.cache.get(joinLeft).send(joinEmbed);

    })
    client.on("guildMemberRemove", (member) => {
        const leaveEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.username}`)
            .setTitle(`Wyszedł z serwera.`)
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor("#89e322")
            .addFields(
                { name: '\u200B', value: 'Trudno sie mówi, jeden problem z głowy' },
                { name: '\u200B', value: '\u200B' },
            )
            .setImage('https://c.tenor.com/57RuyqlXN_8AAAAC/peach-cat.gif')
            .setFooter('Nq')
        client.channels.cache.get(joinLeft).send(leaveEmbed);
    })

}