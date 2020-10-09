module.exports = {
    name: 'everyone',
    description: "this is a ping command!",
    execute(message, args){
        
        const mess = message.content

        message.delete()
        
        message.channel.send(mess);
    }
}