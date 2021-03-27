module.exports = {
    name: 'discord',
    description: "Discord link!",
    execute(message, args){
        
        const responses = [
            'Here is a link to my official discord server.',
            'Ciao, sono Toni!',
            'Hey, have you ever heard of Discord?',
            'Not to advertise, but...'
        ]
        
        const response = (responses[Math.floor(Math.random() * responses.length)])
        message.channel.send(`${response} https://discord.gg/3ej2sPg`);
    }
}