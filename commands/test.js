module.exports={
    name: 'test',
    description: 'Testowa komenda',
    execute(message, args){
        if(args[0] == "tb"){
            if(message.member.roles.cache.some(r => r.name === 'Mod') || (message.member.roles.cache.some(r => r.name === 'Właściciel'))){
                message.channel.send(`id_discordowe = ${message.author.id} i username = ${message.author.username}`);
            }else{
                message.channel.send("Nie ruszaj co nie możesz :angry:");
            }
        }
    }
}