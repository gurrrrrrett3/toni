const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = ''
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('Toni is online!');
});
 
client.on('message', message =>{

const hornyChance = Math.floor(Math.random() * 1000)

if (hornyChance == 420){
    message.channel.send("Im horny");
}

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    console.log('From: ' + message.member)
    console.log('At: ' + message.createdAt)
    console.log('In: ' + message.guild.name)
    console.log('Channel: ' + message.channel.name)
    console.log('Content: ' + message.content)
    console.log('')
 
    if(message.author.bot){
        console.log('RESPONSE: ' + message.content)
        console.log('')
    }

   const args = message.content; 
 const command = args.toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command.includes('pasta')){
        client.commands.get('pasta').execute(message, args);
    }else if (command.includes('candle')){
        client.commands.get('candle').execute(message, args);
    }else if (command.includes('wiki')){
        client.commands.get('wiki').execute(message, args);
    }else if (command.includes('toni')  || command.includes("tony")){
        client.commands.get('toni').execute(message, args);
    } else if (command.includes('im') || command.includes("i'm")){
        client.commands.get('im').execute(message, args);
    }else if (command.includes('meatball')){
        client.commands.get('meatball').execute(message, args);
     
    }
}
)

client.login('NzYzMjQ1OTUxNTczNjg4MzUw.X306Lw.7ZwLDlWtHeDYoFkck1bP1RNXG4M');