const { Discord } = require("../../variables")
const { version, author } = require(__dirname + '/../config/config.js');

module.exports = {
    name: "info",
    description: "Bot info.",

    run(msg) {
        const { channel } = msg

        const botAuthor = author
        const botVersion = `v${version}`
        const botName = "CyberChlebek"
        const botDescription =
         "Bot serwerowy UwU"

        const embed = new Discord.MessageEmbed()

            .setTitle(botName)
            .setColor("CFDF00")
            .setDescription(botDescription)
            .addField("Autor: ", botAuthor, true)
            .addField("Wersja: ", botVersion, true)
            .setFooter("Aktualnie w fazie testowej, hostowany lokalnie...")

        channel.send(embed)
    },
}