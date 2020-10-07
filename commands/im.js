module.exports = {
    name: 'im',
    description: "this is a ping command!",
    execute(message, args){
        const mess = message.content;
        const pos = mess.indexOf('im') + 3;
        const out = 'Hi, ' + mess.substring(pos,mess.length) + ", I'm Toni!";
        message.channel.send(out);
    }
}