const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const prefix = "tost!";
const admin_role = "Właściciel";
const moderator_role = "Mod";
const IdLogi = "796812056439160892";




module.exports = {
    Discord, client, prefix, admin_role, moderator_role, IdLogi
}