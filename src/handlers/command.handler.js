const { Collection, Channel } = require("discord.js")

const { prefix, secondPrefix, permissionLevel1, permissionLevel2 } = require(__dirname + '/../config/config.js');

const { readdirSync } = require("fs")

const ascii = require("ascii-table");

const table = new ascii().setHeading("Command", "Load Status")

module.exports = (client) => {
    
    //Commands
    client.commands = new Collection()

    //cooldown collections
    const cooldowns = new Collection()
    
    const commandFiles = readdirSync(__dirname + "/../commands").filter(file => file.endsWith("command.js"))
    
    for(const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`)

        if(command.name) {
            client.commands.set(command.name, command)
            table.addRow(file, "✅")
        } else{
            table.addRow(file, "❌")
            continue
        }
    }

    //display table
    console.log(table.toString());

    //Message Event
client.on("message", (msg) => {

    const { author, guild, member } = msg

    //Check if user is not a bot and message is on server
    if(msg.author.bot){
        return;
    }


    //Check if contains prefix
    if(!msg.content.startsWith(prefix) && !msg.content.startsWith(secondPrefix)) return;

    
    //Splits Arguments
    let args = ''
    if(msg.content.startsWith(prefix)){
        args = msg.content.slice(prefix.length).trim().split(/ +/g);
    }
    if(msg.content.startsWith(secondPrefix)){
        args = msg.content.slice(secondPrefix.length).trim().split(/ +/g);
    }


    //Set arguments to lower Case to avoid conflicts
    const cmdName = args.shift().toLowerCase();


    //check if command exists
    if (!client.commands.has(cmdName)) return

    const cmd = client.commands.get(cmdName)


    //check GuildOnly
    if(cmd.guildOnly && !guild){
        return msg.reply("Komenda nie działa w prywatnych wiadomościach :sob:")
    }

    //check Permission
    if(cmd.permissionLevel == 1){
        if(!member.roles.cache.has(permissionLevel1) && !member.roles.cache.has(permissionLevel2)){
            return msg.reply("Nie masz odpowiednich uprawnień :angry:")
        }
    }
    if(cmd.permissionLevel == 2){
        if(!member.roles.cache.has(permissionLevel2)){
            return msg.reply("Nie masz odpowiednich uprawnień :angry:")
        }
    }

    //check cooldown
    if(!cooldowns.has(cmdName)){
        cooldowns.set(cmdName, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(cmdName)
    const cooldownAmount = (cmd.cooldown || 3) * 1000

    if(timestamps.has(author.id)){
        const expirationTime = timestamps.get(author.id) + cooldownAmount

        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000
            return msg.reply(`Poczekaj jeszcze ${timeLeft.toFixed(1)} zanim użyjesz tej komendy.`)
        }
    }

    timestamps.set(author.id, now)
    setTimeout(() => {
        timestamps.delete(author.id)
    }, cooldownAmount)

    //Usage info
    if(cmd.args && !args.length){
        let reply = `❌ Brakuje argumentów, ${msg.author}`
        
        if(cmd.usage) {
            reply += `\nPoprawne użycie: \`${prefix}${cmdName} ${cmd.usage}\``
        }
        return msg.channel.send(reply)
    }

    try{
        client.commands.get(cmdName).run(msg,args)
    } catch(error){
        console.log(error)
        msg.reply("Wystąpił problem podczas wykonywania polecenia :sob:")
    }

});
}