const { Discord, client } = require("../../variables")
const mongoose = require('mongoose')
const Gry = require('../models/gry')
const Role = require('../models/role')
const Kolory = require('../models/kolory')

module.exports = (client) =>{
        const channelId = '820323794019024907'
        client.on('messageReactionAdd', async (reaction, user) => {
            if(!reaction.message.guild) return
            if(user.bot) return
            if(reaction.message.channel != channelId) return
            let reactedEmoji = `<:${reaction._emoji.name}:${reaction._emoji.id}>`
            if(await Gry.exists({ emoji: reactedEmoji })){
                await Gry.findOne({ emoji: reactedEmoji })
                    .then((result) => {
                        let fixedResult = result.roleId.split('<@&')
                        fixedFixedResult = fixedResult[1].split('>')
                        reaction.message.guild.members.cache.get(user.id).roles.add(fixedFixedResult[0])
                    })
            }
            if(await Kolory.exists({ emoji: reactedEmoji })){
                await Kolory.findOne({ emoji: reactedEmoji })
                    .then((result) => {
                        let fixedResult = result.roleId.split('<@&')
                        fixedFixedResult = fixedResult[1].split('>')
                        reaction.message.guild.members.cache.get(user.id).roles.add(fixedFixedResult[0])
                    })
            }
            if(await Role.exists({ emoji: reactedEmoji })){
                await Role.findOne({ emoji: reactedEmoji })
                    .then((result) => {
                        let fixedResult = result.roleId.split('<@&')
                        fixedFixedResult = fixedResult[1].split('>')
                        reaction.message.guild.members.cache.get(user.id).roles.add(fixedFixedResult[0])
                    })
            }

        })
}