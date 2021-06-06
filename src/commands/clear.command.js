module.exports = {
    name: "clear",
    description: "Clear messeges at channel",
    args: true,
    usage: "<amount>",
    //cooldown: 10,
    permissionLevel: "1",

    run(msg, args) {
        const { channel } = msg

        const amount = parseInt(args)

        if(!Number.isInteger(amount)){
            return channel.send("❌ Musisz podać **liczbe**.")
        }

        if(amount < 2 || amount > 100){
            return channel.send("❌ Komenda clear może jednorazowo skasować wiadomości w przedziale **2-100**")
        }

        channel.bulkDelete(amount)
    },
}