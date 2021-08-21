const mongoose = require('mongoose')
const CurrentMovie = require('../models/currentMovie')
const Movie = require('../models/movie')
const Proposition = require('../models/proposition')
const { Discord, client } = require("../../variables")
const { permissionLevel1, permissionLevel2, ogolny, moviesDiscussion, moviesProps } = require(__dirname + '/../config/config.js');


module.exports = {
    name: 'film',
    description: 'Movies commands',
    args: true,
    usage: 'help',
    
    
    
    async run(msg, args){
        function checkPermission(){
            if(!msg.member.roles.cache.has(permissionLevel1) && !msg.member.roles.cache.has(permissionLevel2)){
                    return true
            }
        }
        
        //DATABASE CONNECT
        const currentMovieExists = await CurrentMovie.exists({})
        switch(args[0]){
            case 'help':
                const helpEmbed = new Discord.MessageEmbed()
                    .setTitle('Lista argumentów komendy *film* :popcorn:')
                    .setColor("a7f542")
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Komendy Użytkownika', value: '\`obecny\` - wyświetla informacje o obecnie zaplanowanym do obejrzenia filmie, jeśli jakiś jest,\n\`ocen [1-10]\` - pozwala ocenić obecny film,\n\`proponuj\` - komenda służąca do proponowania filmów,\n\`losuj\` - wylosuj jeden film z listy propozycji (tylko zaakceptowane)'},
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Komendy Moderatora', value: '\`dodaj\` - dodaje nowy obecnie zaplanowany film,\n\`inform\` - informuje na odpowiednich kanałach o zaplanowanym oglądaniu,\n\`usunobecny\` - usuwa obecnie zaplanowany film,\n\`push\` - pozwala przenieść obecnie zaplanowany film do głównej listy, np już po obejrzeniu,'},
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Do Zrobienia', value: 'Aktualnie nic :relaxed:'},
                    )
                return msg.reply(helpEmbed)
                break
            case 'dodaj':
                if(checkPermission() === true) return msg.reply("Nie masz odpowiednich uprawnień :angry:")
                if(currentMovieExists) return msg.reply('Jest już zaplanowany film, jeśli chcesz go usunąć użyj komendy \`tost!film usunobecny\`. Jeśli film został już obejrzany i chcesz dodać go do ogólnej bazy danych użyj komendy \`tost!film push\`')
                const newCurrentMovie = new CurrentMovie({
                    author: msg.author.username,
                    authorAvatar: msg.author.avatarURL(),
                    title: '',
                    category: '',
                    link: '',
                    desc: '',
                    date: '',
                    hour: '',
                    photo: '',
                    time: '',
                    year: '',
                })

                const questions = [
                    'Podaj tytuł filmu: ',
                    'Z którego roku jest film: ',
                    'Podaj kategorie filmu: ',
                    'Wyślij link do zwiastunu: ',
                    'Ile będzie trwać film: ',
                    'Podaj opis filmu: ',
                    'Podaj date oglądania: [yyyy-mm-dd]',
                    'Podaj godzine oglądania: ',
                    'Wyślij link do zdjęcia: ',
                ]
                let counter = 0
                const filter = m => m.author.id === msg.author.id
                const collector = new Discord.MessageCollector(msg.channel, filter, { time: 120000, max: questions.length })

                msg.channel.send(questions[counter++])
                collector.on('collect', m => {
                    if(counter < questions.length) {
                        m.channel.send(questions[counter++])
                    }
                })

                collector.on('end', collected => {
                    console.log(`Collected: ${collected.size} messages in Add New Current Movie process`)
                    if(collected.size == 9){
                        let counter = 0
                        collected.forEach((value) => {
                            if(counter == 0) newCurrentMovie.title = value.content
                            if(counter == 1) newCurrentMovie.year = value.content
                            if(counter == 2) newCurrentMovie.category = value.content
                            if(counter == 3) newCurrentMovie.link = value.content
                            if(counter == 4) newCurrentMovie.time = value.content
                            if(counter == 5) newCurrentMovie.desc = value.content
                            if(counter == 6) newCurrentMovie.date = value.content
                            if(counter == 7) newCurrentMovie.hour = value.content
                            if(counter == 8) newCurrentMovie.photo = value.content
                            counter++
                        })
                        newCurrentMovie.save()
                        return msg.reply(`Dodano nowy **obecny** film, ${newCurrentMovie.title}`)
                    }
                    return msg.reply('Nie podano wszystkich wymaganych opcji, spróbuj ponownie.')
                })
                break
            case 'obecny':
                if(currentMovieExists){
                    await CurrentMovie.find({})
                        .then(result => {
                            const currentEmbed = new Discord.MessageEmbed()
                                .setAuthor(result[0].author, result[0].authorAvatar)
                                .setTitle(result[0].title)
                                .setColor("a7f542")
                                .setDescription(`${result[0].category} z ${result[0].year} roku`)
                                .setURL(result[0].link)
                                .addFields(
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'Opis filmu', value: result[0].desc },
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'Czas trwania', value: result[0].time, inline: true },
                                    { name: 'Data oglądania', value: `${result[0].date} ‎‎‎     ‎‎‎${result[0].hour}`, inline: true },
                                )
                                .setImage(result[0].photo)
                                .setThumbnail('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')
                            return msg.reply(currentEmbed)
                        })
                }else{
                    return msg.reply('Nie ma obecnie zaplanowanego filmu.')
                }
                
                break
            case 'inform':
                if(checkPermission() === true) return msg.reply("Nie masz odpowiednich uprawnień :angry:")
                if(currentMovieExists){
                    await CurrentMovie.find({})
                        .then(result => {
                            let today = new Date()
                            let year = today.getFullYear()
                            let month = today.getMonth() + 1
                            let day = today.getDate()
                            let nextDay = ''
                            if(month < 10) month = `0${month}`
                            if(day < 10) {
                                nextDay = `0${day + 1}`
                                day = `0${day}`
                            }
                            let currentDate = `${year}-${month}-${day}`
                            let tommorowDate = `${year}-${month}-${nextDay}`
                            console.log(currentDate, tommorowDate, result[0].date)
                            if(currentDate == result[0].date) currentDate = "Dziś"
                            if(tommorowDate == result[0].date) currentDate = "Jutro"
                            const informEmbed = new Discord.MessageEmbed()
                                .setColor("a7f542")
                                .setTitle('Wspólne oglądanie')
                                .setDescription(`${currentDate} o godzinie **${result[0].hour}** oglądamy film z kategorii **${result[0].category}** pod tytułem ***${result[0].title}*** z ${result[0].year} roku.`)
                                .addFields(
                                    { name: 'Opis filmu', value: `||${result[0].desc}||` },
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'Czas Trwania', value: result[0].time, inline: true },
                                    { name: 'Zwiastun', value: result[0].link, inline: true },
                                    { name: '\u200B', value: '\u200B' },
                                    { name: `Zapraszam wszystkich! :popcorn: :relaxed:`, value: `<@&644807642467794944>` },
                                )
                                .setImage(result[0].photo)
                                .setThumbnail('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')
                            console.log(ogolny, moviesDiscussion)
                            msg.client.channels.cache.get(ogolny).send("<@&644807642467794944>")
                            msg.client.channels.cache.get(ogolny).send(informEmbed)
                            msg.client.channels.cache.get(moviesDiscussion).send(informEmbed)
                            /* const channel = client.channels.cache.find(channel => channel.name === ) */
                            return
                        })
                    
                }else{
                    return msg.reply('Nie ma obecnego filmu.')
                }
                break
            case 'usunobecny':
                if(checkPermission() === true) return msg.reply("Nie masz odpowiednich uprawnień :angry:")
                if(currentMovieExists){
                    await CurrentMovie.deleteOne({})
                    return msg.reply('Usunięto **Obecny** film.')
                }
                return msg.reply('Nie ma obecnego filmu.')
                break
            case 'ocen':
                if(args[1] < 0 || args[1] > 10 ){
                    return msg.reply('Oceny od 1 do 10.')
                }
                if(currentMovieExists){
                    if(args[1]){
                        await CurrentMovie.find({})
                            .then(async(result) => {
                                let test = ''
                                result[0].score.forEach((value) => {
                                    if(value.id == msg.author.id){
                                        msg.reply('Oceniłeś już ten film.')
                                        test = true
                                    }
                                })
                                


                                if(!test){
                                    let scoreArray = result[0].score
                                    scoreArray.push({ username: msg.author.username, id: msg.author.id, amount: args[1] })
                                    await CurrentMovie.updateOne({ score: scoreArray })
                                        .then(() => {
                                            msg.reply(`Oceniłeś film **${result[0].title}** na *${args[1]}*`)
                                        })
                                }

                            })
                        return
                    }else {
                        return msg.reply('Poprawne użycie komendy: \`tost!film ocen [1-10]\`')
                    }
                }
                return msg.reply('Nie ma obecnego filmu.')
                break
            case 'oceny':
                if(currentMovieExists){
                    await CurrentMovie.find({})
                        .then((result) => {
                            let srednia = 0
                            let counter = 0
                            const ocenyEmbed = new Discord.MessageEmbed()
                            .setTitle(`Oceny filmu **${result[0].title}**`)
                            .setColor("a7f542")
                            .setURL(result[0].link)
                            .setDescription(`${result[0].category} z ${result[0].year} roku`)
                            .setImage(result[0].photo)
                            .addField('\u200B', '\u200B')
                            result[0].score.forEach((value) => {
                                ocenyEmbed.addField( value.username, value.amount, true)
                                srednia+=parseInt(value.amount)
                                counter++
                            })
                            ocenyEmbed.setAuthor(`Średnia Ocen: ${(srednia / counter).toFixed(2)} z ${counter} głosów`)
                            return msg.reply(ocenyEmbed)
                        })
                }else{
                    return msg.reply('Nie ma obecnego filmu.')
                }
                break
            case 'push':
                if(checkPermission() === true) return msg.reply("Nie masz odpowiednich uprawnień :angry:")
                if(currentMovieExists){
                    await CurrentMovie.find({})
                        .then(async(result) => {
                            const exists = await Movie.exists({ title: result[0].title })
                            if(exists){
                                msg.reply('Film o tym tytule jest już na liście')
                                return
                            }
                            const pushToMoviesList = new Movie({
                                author: result[0].author,
                                authorAvatar: result[0].authorAvatar,
                                title: result[0].title,
                                year: result[0].year,
                                category: result[0].category,
                                desc: result[0].desc,
                                date: result[0].date,
                                time: result[0].time,
                                hour: result[0].hour,
                                link: result[0].link,
                                photo: result[0].photo,
                                score: result[0].score,
                            })
                            pushToMoviesList.save()
                            console.log(result[0]._id)
                            CurrentMovie.findByIdAndDelete({_id: result[0]._id}, result[0], function(err,data){
                                if(err){
                                    console.log(err)
                                }
                            })
                            return msg.reply('Obecny film został przeniesiony do głównej listy')
                        })
                }else{
                    return msg.reply('Nie ma obecnego filmu.')
                }
                break
            case 'losuj':
                const propsExists = await Proposition.exists({})
                if(propsExists){
                    await Proposition.find({ accepted: true })
                        .then((result) => {
                            generatedProp = result[Math.floor(Math.random() * result.length)]
                            const generatedPropInfo = new Discord.MessageEmbed()
                                .setAuthor(`Wylosowany został film...`)
                                .setTitle(generatedProp.title)
                                    .setColor("a7f542")
                                    .setDescription(`${generatedProp.category}`)
                                    .addFields(
                                        { name: '\u200B', value: '\u200B' },
                                        { name: 'Zwiastun :popcorn:', value: generatedProp.link }
                                    )
                                    .setFooter('Jak ci sie nie podoba to sobie jeszcze raz losuj, najlepiej sam :angry: ')
                                    .setThumbnail('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')
                            return msg.reply(generatedPropInfo)
                        })
                }else{
                    return msg.reply('Nie ma żadnych propozycji z których moge losować :/')
                }
                break
            case 'proponuj':
                const newProposition = new Proposition({
                    title: '',
                    category: '',
                    link: '',
                    accepted: false,
                    deny: false,
                    waiting: true,
                })
                const questions2 = [
                    'Podaj tytuł filmu: ',
                    'Podaj kategorie filmu: ',
                    'Wyślij link do zwiastunu: ',
                ]
                let counter2 = 0
                const filter2 = m => m.author.id === msg.author.id
                const collector2 = new Discord.MessageCollector(msg.channel, filter2, { time: 120000, max: questions2.length })

                msg.channel.send(questions2[counter2++])
                collector2.on('collect', m => {
                    if(counter2 < questions2.length) {
                        m.channel.send(questions2[counter2++])
                    }
                })

                collector2.on('end', collected => {
                    console.log(`Collected: ${collected.size} messages in Add Prop process`)
                    if(collected.size == 3){
                        let counter2 = 0
                        collected.forEach((value) => {
                            if(counter2 == 0) newProposition.title = value.content
                            if(counter2 == 1) {
                                let con = value.content.toLowerCase()
                                con = con.charAt(0).toUpperCase() + con.slice(1)
                                if(con != 'Horror' && con != 'Komedia' && con != 'Dramat' && con != 'Thriller' && con != 'Inne' && con != 'Animowane') {
                                    con = 'Failed'
                                }
                                newProposition.category = con
                            }
                            if(counter2 == 2) newProposition.link = value.content
                            counter2++
                        })
                        if(newProposition.category == 'Failed') return msg.reply('Błędna nazwa kategorii [Komedia | Dramat | Horror | Thriler | Animowane | Inne]')
                        else newProposition.save()
                        //console.log(collected.username)
                        const propInfoEmbed = new Discord.MessageEmbed()
                            .setAuthor(`${msg.author.username} proponuje film`, msg.author.displayAvatarURL())
                            .setTitle(newProposition.title)
                                .setColor("a7f542")
                                .setDescription(`${newProposition.category}`)
                                .addFields(
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'Zwiastun :popcorn:', value: newProposition.link }
                                )
                                .setFooter('Wszystkie aktualne propozycje możesz sprawdzić pod linkiem przy nazwie kanału')
                                .setThumbnail('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')
                        msg.client.channels.cache.get(moviesProps).send(propInfoEmbed)
                        return msg.reply(`Dodano nową propozycję, ${newProposition.title}`)
                    }
                    return msg.reply('Nie podano wszystkich wymaganych opcji, spróbuj ponownie.')
                })
                break
            default:
                return msg.reply('Niepoprawna komenda. Użyj komendy tost!film help.')
        }

    }
}