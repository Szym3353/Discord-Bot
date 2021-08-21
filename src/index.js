const { token } = require('./config/config.js');
const { Client } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client();

const commandHandler = require("./handlers/command.handler")
const deleteMessageHandler = require("./handlers/deleteMessage.handler")
const invitesHandler = require("./handlers/joinLeave.handler")
const reactionHandler = require("./handlers/reaction.handler")

client.once('ready', () => {
    const dbURI = 'mongodb+srv://szym:1212323@nodetests.0qoj4.mongodb.net/movies?retryWrites=true&w=majority'
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('CyberChlebek został włączony i połączył sie z bazą B)');
});
//Command handler -- src -> handlers -> command.handler.js
commandHandler(client)
deleteMessageHandler(client)
invitesHandler(client)
reactionHandler(client)


const { EEXIST } = require('constants');
const { Channel } = require('discord.js');


//Startup Message


/*client.on("guildMemberAdd", (member) => {
    client.channels.cache.get(joinLeft).send(`🟢‎‏‏‎ ‎‏‏‎ ‎ Użytkownik ${member} dołączył na serwer.`);
});
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get(joinLeft).send(`🔴 ‏‏‎ ‎‏‏‎ ‎Użytkownik ${member} opuścił serwer.`);
});*/



client.login(token);

// Error Handler
client.on("debug", () => {})
client.on("error", () => {})
client.on("warn", () => {})
