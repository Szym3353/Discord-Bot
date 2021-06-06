const { Discord } = require("../../variables")


module.exports = {
    name: "pkn",
    description: "papier... kamień... nożyce... xDDD",
    args: true,
    usage: "<[p | k | n]>",
    cooldown: "15",

    run(msg, args){
        const { channel } = msg

        const argument = args[0].toLowerCase()

        if(argument != "p" && argument != "k" && argument != "n"){
            return msg.reply("Błędny argument. Użyj: \`[p | k | n]\`")
        }

        let botMove, playerMove
        const rand = Math.floor(Math.random() * 9)
        if(rand >= 0 && rand < 3){
            botMove = ":rock:"
        }
        if(rand >= 3 && rand < 6){
            botMove = ":scissors:"
        }
        if(rand >=6){
            botMove = ":roll_of_paper:"
        }

        if(argument == "p"){
            playerMove = ":roll_of_paper:"
        }
        if(argument == "k"){
            playerMove = ":rock:"
        }
        if(argument == "n"){
            playerMove = ":scissors:"
        }


        const loseEmbed = new Discord.MessageEmbed()
            .setTitle("Papier, Kamień, Nożyce")
            .setColor("B90000")
            .addField("Bot:", botMove, true)
            .addField("Gracz:", playerMove, true)
            .setDescription("Przegrałeś :sob:")

        const drawEmbed = new Discord.MessageEmbed()
            .setTitle("Papier, Kamień, Nożyce")
            .setColor("CFDF00")
            .addField("Bot:", botMove, true)
            .addField("Gracz:", playerMove, true)
            .setDescription("Remis :face_with_raised_eyebrow:")

        const winEmbed = new Discord.MessageEmbed()
            .setTitle("Papier, Kamień, Nożyce")
            .setColor("0EB900")
            .addField("Bot:", botMove, true)
            .addField("Gracz:", playerMove, true)
            .setDescription("Wygrałeś :face_vomiting:")



        if(rand >= 0 && rand < 3){
            if(argument == "p"){
                return msg.reply(winEmbed)
            }
            if(argument == "k"){
                return msg.reply(drawEmbed)
            }
        }
        if(rand >= 3 && rand < 6){
            if(argument == "k"){
                return msg.reply(winEmbed)
            }
            if(argument == "n"){
                return msg.reply(drawEmbed)
            }
        }
        if(rand >=6){
            if(argument == "n"){
                return msg.reply(winEmbed)
            }
            if(argument == "p"){
                return msg.reply(drawEmbed)
            }
        }

        return msg.reply(loseEmbed)
    }
}