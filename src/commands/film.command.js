const mongoose = require('mongoose')
const CurrentMovie = require('../models/currentMovie')
const { Discord } = require("../../variables")
const { Message } = require('discord.js')

module.exports = {
    name: 'film',
    description: 'Movies commands',
    args: true,
    usage: '<help|dodaj|obecny|usunobecny|top|ocen|push>',

    
    
    async run(msg, args){
        
        //DATABASE CONNECT
        const dbURI = 'mongodb+srv://szym:1212323@nodetests.0qoj4.mongodb.net/movies?retryWrites=true&w=majority'
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        const currentMovieExists = await CurrentMovie.exists({})
        switch(args[0]){
            case 'help':
                return msg.reply('help')
                break
            case 'dodaj':
                console.log(msg.author.username)
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
                    'Podaj date oglądania: [dd.mm.yyyy]',
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
                    console.log(`Collected: ${collected.size} messages`)
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
                            const resultEmbed = new Discord.MessageEmbed()
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
                            return msg.reply(resultEmbed)
                        })
                }else{
                    return msg.reply('Nie ma obecnie zaplanowanego filmu.')
                }
                
                break
            case 'usunobecny':
                if(currentMovieExists){
                    await CurrentMovie.deleteOne({})
                    return msg.reply('Usunięto **Obecny** film.')
                }
                return msg.reply('Nie ma obecnego filmu.')
                break
            case 'ocen':
                if(currentMovieExists){
                    if(args[2]){
                        await CurrentMovie.find({})
                            .then((result) => {
                                
                            })
                    }else return msg.reply('Poprawne użycie komendy: \`tost!film ocen [1-10]\`')
                }
                return msg.reply('Nie ma obecnego filmu.')
                break
        }

    }
}