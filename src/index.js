const { token } = require('./config/config.js');
const { Client } = require('discord.js');
const client = new Client();

const commandHandler = require("./handlers/command.handler")
const deleteMessageHandler = require("./handlers/deleteMessage.handler")
const invitesHandler = require("./handlers/joinLeave.handler")

//Command handler -- src -> handlers -> command.handler.js
commandHandler(client)
deleteMessageHandler(client)
invitesHandler(client)


const { EEXIST } = require('constants');
const { Channel } = require('discord.js');


//Startup Message
client.once('ready', () => {
    console.log('CyberChlebek został włączony');
});


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
