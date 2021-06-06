const { joinLeft, activityRole1, basicColor, categoryGame, categoryOther, categoryRole } = require(__dirname + '/../config/config.js');
const { Discord } = require("../../variables")
module.exports = (client) => {

    client.on("guildMemberAdd", (member) => {
        member.roles.add(member.guild.roles.cache.find(r => r.id === basicColor));
        member.roles.add(member.guild.roles.cache.find(r => r.id === activityRole1));
        member.roles.add(member.guild.roles.cache.find(r => r.id === categoryRole));
        member.roles.add(member.guild.roles.cache.find(r => r.id === categoryGame));
        member.roles.add(member.guild.roles.cache.find(r => r.id === categoryOther));
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