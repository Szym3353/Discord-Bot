require('dotenv').config()
const { Client } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client();

const commandHandler = require("./handlers/command.handler")
const deleteMessageHandler = require("./handlers/deleteMessage.handler")
const invitesHandler = require("./handlers/joinLeave.handler")
const reactionHandler = require("./handlers/reaction.handler")

client.once('ready', () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Bot working and connected to database');
});


commandHandler(client)
deleteMessageHandler(client)
invitesHandler(client)
reactionHandler(client)


const { EEXIST } = require('constants');
const { Channel } = require('discord.js');




client.login(process.env.BOT_TOKEN);

// Error Handler
client.on("debug", () => {})
client.on("error", () => {})
client.on("warn", () => {})
