module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args){
       
        var ping = Date.now() - message.createdTimestamp + " ms";
        message.channel.send("Pong! `" + `${(Math.abs(Date.now() - message.createdTimestamp))/ 100}` + " ms`");
    }
}