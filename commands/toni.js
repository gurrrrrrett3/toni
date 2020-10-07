module.exports = {
    name: 'toni',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('Ciao, sono Toni!');
    }
}