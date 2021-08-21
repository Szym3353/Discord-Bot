const mongoose = require('mongoose')
const Gry = require('../models/gry')
const Role = require('../models/role')
const Kolory = require('../models/kolory')
const { Discord, client } = require("../../variables")

module.exports = {
    name: "lista",
    description: "List of games, roles etc",
    args: true,
    permissionLevel: "1",
    async run(msg, args) {
        if(!args[1]){
            switch(args[0]){
                case 'gry':
                    await Gry.find({})
                        .then((result) => {
                            console.log(result)
                            const gryEmbed = new Discord.MessageEmbed()
                                .setTitle(`Gry w które tu gramy`)
                                .setColor("a7f542")
                                result.forEach((value) => {
                                    gryEmbed.addField( '\u200B', `${value.emoji} - ${value.name}`)
                                })
                            return msg.reply(gryEmbed)
                        })
                    break
                case 'role':
                    await Role.find({})
                        .then((result) => {
                            console.log(result)
                            const roleEmbed = new Discord.MessageEmbed()
                                .setTitle(`Inne zajęcia`)
                                .setColor("a7f542")
                                result.forEach((value) => {
                                    roleEmbed.addField( '\u200B', `${value.emoji} - ${value.name}`)
                                })
                            return msg.reply(roleEmbed)
                        })
                    break
                case 'kolory':
                    await Kolory.find({})
                    .then((result) => {
                        console.log(result)
                        const koloryEmbed = new Discord.MessageEmbed()
                            .setTitle(`Dostępne kolory nicków`)
                            .setColor("a7f542")
                            result.forEach((value) => {
                                koloryEmbed.addField( '\u200B', `${value.emoji} - ${value.name}`)
                            })
                        return msg.reply(koloryEmbed)
                    })
                    break
            }
        }if(args[1] == "dodaj"){
            switch(args[0]){
                case 'gry':
                    const newGame = new Gry({
                        name: '',
                        roleId: '',
                        emoji: '',

                    })
                    const questionsGry = [
                        'Podaj tytuł gry: ',
                        'Teraz id roli: (weź role na chacie i zanim ją wyślesz napisz \\ przed nią) ',
                        'I jeszcze id emoji: (tak samo) ',
                    ]
                    let counterGry = 0
                    const filterGry = m => m.author.id === msg.author.id
                    const collectorGry = new Discord.MessageCollector(msg.channel, filterGry, { time: 120000, max: questionsGry.length })

                    msg.channel.send(questionsGry[counterGry++])
                    collectorGry.on('collect', m => {
                        if(counterGry < questionsGry.length) {
                            m.channel.send(questionsGry[counterGry++])
                        }
                    })

                    collectorGry.on('end', collected => {
                        function delSlashes(data){
                            const splitedData = data.split('\\')
                            console.log(splitedData)
                            return splitedData[1]
                        }
                        if(collected.size == 3){
                            let counterGry = 0
                            collected.forEach((value) => {
                                if(counterGry == 0) newGame.name = value.content
                                if(counterGry == 1) newGame.roleId = delSlashes(value.content)
                                if(counterGry == 2) newGame.emoji = delSlashes(value.content)
                                counterGry++
                            })
                            newGame.save()
                            return msg.reply(`Dodano gre do listy, ${newGame.name}`)
                        }
                        return msg.reply('Nie podano wszystkich wymaganych opcji, spróbuj ponownie.')
                    })
                    break
                case "role":
                    const newRole = new Role({
                        name: '',
                        roleId: '',
                        emoji: '',

                    })
                    const questionsRole = [
                        'Podaj czego dotyczy rola: ',
                        'Teraz id roli: (weź role na chacie i zanim ją wyślesz napisz \\ przed nią) ',
                        'I jeszcze id emoji: (tak samo) ',
                    ]
                    let counterRole = 0
                    const filterRole = m => m.author.id === msg.author.id
                    const collectorRole = new Discord.MessageCollector(msg.channel, filterRole, { time: 120000, max: questionsRole.length })

                    msg.channel.send(questionsRole[counterRole++])
                    collectorRole.on('collect', m => {
                        if(counterRole < questionsRole.length) {
                            m.channel.send(questionsRole[counterRole++])
                        }
                    })

                    collectorRole.on('end', collected => {
                        function delSlashes(data){
                            const splitedData = data.split('\\')
                            console.log(splitedData)
                            return splitedData[1]
                        }
                        if(collected.size == 3){
                            let counterRole = 0
                            collected.forEach((value) => {
                                if(counterRole == 0) newRole.name = value.content
                                if(counterRole == 1) newRole.roleId = delSlashes(value.content)
                                if(counterRole == 2) newRole.emoji = delSlashes(value.content)
                                counterRole++
                            })
                            newRole.save()
                            return msg.reply(`Dodano role do listy, ${newRole.name}`)
                        }
                        return msg.reply('Nie podano wszystkich wymaganych opcji, spróbuj ponownie.')
                    })
                    break
                    case "kolory":
                        const newKolor = new Kolory({
                            roleId: '',
                            emoji: '',
    
                        })
                        const questionsKolor = [
                            'Teraz id roli: (kliknij na role prawym i kopiuj Id, to mi wystarczy) ',
                            'I jeszcze id emoji: ',
                        ]
                        let counterKolor = 0
                        const filterKolor = m => m.author.id === msg.author.id
                        const collectorKolor = new Discord.MessageCollector(msg.channel, filterKolor, { time: 120000, max: questionsKolor.length })
    
                        msg.channel.send(questionsKolor[counterKolor++])
                        collectorKolor.on('collect', m => {
                            if(counterKolor < questionsKolor.length) {
                                m.channel.send(questionsKolor[counterKolor++])
                            }
                        })
    
                        collectorKolor.on('end', collected => {
                            function delSlashes(data){
                                const splitedData = data.split('\\')
                                console.log(splitedData)
                                return splitedData[1]
                            }
                            function genSlashes(data){
                                const fixedData = `<@&${data}>`
                                return fixedData
                            }
                            if(collected.size == 2){
                                let counterKolor = 0
                                collected.forEach((value) => {
                                    if(counterKolor == 0) newKolor.roleId = genSlashes(value.content)
                                    if(counterKolor == 1) newKolor.emoji = delSlashes(value.content)
                                    counterKolor++
                                })
                                newKolor.save()
                                return msg.reply(`Dodano kolor do listy`)
                            }
                            return msg.reply('Nie podano wszystkich wymaganych opcji, spróbuj ponownie.')
                        })
                        break
            }
        }if(args[1] == "generuj"){
            const channelId = '820323794019024907'
            switch(args[0]){
                case "gry":
                    await Gry.find({})
                        .then((result) => {
                            const gryReactionEmbed = new Discord.MessageEmbed()
                                .setTitle(`Wybierz sobie role, jeśli chcesz dostawać pingi.`)
                                .setColor("a7f542")
                                result.forEach((value) => {
                                    gryReactionEmbed.addField( '\u200B', `${value.emoji} - ${value.name}`)
                                })
                            msg.client.channels.cache.get(channelId).send(gryReactionEmbed)
                                .then((msg) => {
                                    result.forEach((value) => {
                                        msg.react(value.emoji)
                                    })
                                })
                            return
                        })
                    break
                case "role":
                    console.log('test')
                    await Role.find({})
                        .then((result) => {
                            const roleReactionEmbed = new Discord.MessageEmbed()
                                .setTitle(`Wybierz sobie role, jeśli chcesz dostawać pingi.`)
                                .setColor("a7f542")
                                result.forEach((value) => {
                                    roleReactionEmbed.addField( '\u200B', `${value.emoji} - ${value.name}`)
                                })
                            msg.client.channels.cache.get(channelId).send(roleReactionEmbed)
                                .then((msg) => {
                                    result.forEach((value) => {
                                        msg.react(value.emoji)
                                    })
                                })
                            return
                        })
                    break
            }
        }
    }
}