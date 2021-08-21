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


    /*const getInviteCounts = async (guild) => {
        return await new Promise((resolve) => {
            guild.fetchInvites().then((invites) => {
                const inviteCounter = {}

                invites.forEach((invite) => {
                    const { uses, inviter } = invite
                    const { username, discriminator } = inviter

                    const name = `${username}#${discriminator}`
                    
                    inviteCounter[name] = (inviteCounter[name] || 0) + uses
                })

                resolve(inviteCounter)
            })
        })
    }

    client.guilds.cache.forEach(async (guild) => {
        invites[guild.id] = await getInviteCounts(guild)
        console.log(invites[guild.id])
    })

    client.on("guildMemberAdd", async (member) => {
        const { guild, id } = member

        const invitesBefore = invites[guild.id]
        const invitesAfter = await getInviteCounts(guild)

        for(const inviter in invitesAfter){
            if(invitesBefore[inviter] === invitesAfter[inviter] - 1) {
                const channel = guild.channels.cache.get('645969309633347607')
                const count = invitesAfter[inviter]
                channel.send(`Test ${id}. Zaproszono ${inviter}`)

                return
            }
        }
    })


    /*const invites = new Collection()

    client.on('inviteCreate', (invite) => {
        let user = `${invite.inviter.username}#${invite.inviter.discriminator}`
        console.log(`${invite.uses}?${invite.inviter.username}#${invite.inviter.discriminator} - ${invite.url}`)
        invites.set(invite.code, user, new Collection())
        console.log(invites)
    })

    client.on("inviteDelete", (invite) => {
        invites.delete(invite.code)
        console.log(invites)
    })
    */
    /*
    client.on("guildMemberAdd", (member) => {
        const joinEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName}`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setColor("0EB900")
            .setDescription("Dołączył na serwer")
        client.channels.cache.get(joinLeft).send(member.displayAvatarURL);
    });

    client.on("guildMemberRemove", (member) => {
        const leaveEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName}`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setColor("B90000")
            .setDescription("Opuścił serwer :sob:")
        client.channels.cache.get(joinLeft).send(leaveEmbed);
        console.log("asd")
    });*/

}