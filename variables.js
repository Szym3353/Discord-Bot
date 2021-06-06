const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "tost!";
const admin_role = "Właściciel";
const moderator_role = "Mod";
const IdLogi = "796812056439160892";
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: "sql7387218",
    password: 'Ji9EmT7rJ7',
    database : 'sql7387218'

});


module.exports = {
    Discord, client, prefix, admin_role, moderator_role, IdLogi, mysql, con
}