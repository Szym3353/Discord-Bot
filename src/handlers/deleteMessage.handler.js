const { Channel, MessageEmbed, MessageAttachment } = require("discord.js")
const { deleteEditLogs } = require(__dirname + '/../config/config.js');

module.exports = (client) => {
    client.on("messageDelete", (messageDelete) => {
        if(messageDelete.attachments.size <= 0){
            const embed = new MessageEmbed()
                .setTitle("Skasowano Wiadomość")
                .setAuthor(`${messageDelete.channel.name}`)
                .setDescription(messageDelete.content)
                .setColor("B90000")
                .setFooter(`Wiadomość napisana przez użytkownika **${messageDelete.author.tag}**`)
            client.channels.cache.get(deleteEditLogs).send(embed)
        }else{
            messageDelete.attachments.forEach(attachment => {
                const ImageLink = attachment.proxyURL;
                const embed = new MessageEmbed()
                    .setTitle("Skasowano Zdjęcie")
                    .setAuthor(`${messageDelete.channel.name}`)
                    .setDescription(messageDelete.content)
                    .setColor("B90000")
                    .setFooter(`Wiadomość napisana przez użytkownika **${messageDelete.author.tag}**`)
                    .setImage(ImageLink)
                client.channels.cache.get(deleteEditLogs).send(embed)
            });
            
        }
    });
}