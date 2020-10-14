const Discord = require('discord.js');
const random = require('random');
const jsonfile = require('jsonfile');
const client = new Discord.Client();

const prefix = '-'
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Toni is online!');
});

//level init

var stats = {};
if (fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');

}


//end init
//----------------------------------------
//when toni sees, he reads

client.on('message', message => {

    //NO DMING TONI 
    if (message.channel.type == 'dm' || message.channel.type == 'news') return;


    //toni is a horny motherfucker

    const hornyChance = Math.floor(Math
        
        .random() * 1000)

    if (hornyChance == 420) {
        message.channel.send("I'm horny motherfucker");
    }
    //log toni's own messages, toni never forgets

    if (message.author.bot) {
        console.log('RESPONSE: ' + message.content)
        console.log('')
    }

    
    //log messages, because toni is a creep

    console.log('From: ' + message.member)
    console.log('At: ' + message.createdAt)
        // console.log('In: ' + message.guild.name)
    console.log('Channel: ' + message.channel.name)
    console.log('Content: ' + message.content)
    console.log('')
        //leveling systems

        //if (message.guild.id in stats === false) {
      //      stats[message.guild.id] = {};
      //  } 

        const guildStats = stats[message.guild.id];
        if(message.author.id in stats === false) {
            stats[message.author.id] = {
                xp: 0,
                level: 0,
                last_message: 0
                
            }
        }
        
        const userStats = stats[message.author.id];
        if(Date.now() - userStats.last_message >= 60000){
        userStats.xp += random.int(15,25);
        userStats.last_message = Date.now();
        if (message.author.bot) return;
        message.react('💰')
        
const filter = (reaction, user) => {
	return ['💰'].includes(reaction.emoji.name) && !user.id.includes('763245951573688350');
};

message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
        const reaction = collected.first();

        const user = reaction.client.user.id
        const username = reaction.client.user.username
        const amount =  random.int(10,50);
        const reactionStats = stats[user]
        reactionStats.xp += amount
        message.reply(username + " Opened the goodie bag and got " + amount + " xp!")
	})
	.catch(collected => {
		message.reply('Error collecting goodie bag.');
	});
        
       
        


       
        const xpToNextLevel = 5* Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
        if(userStats.xp >= xpToNextLevel) {
            userStats.level++;
            userStats.xp = userStats.xp - xpToNextLevel;
            message.channel.send(message.author.username + ' has reached level ' + userStats.level);

        }
        
        jsonfile.writeFileSync('stats.json', stats);

        console.log('LVL SYSTEM:')
        console.log(message.author.username + ' now has ' + userStats.xp + ' xp') 
        console.log(xpToNextLevel + ' XP needed for next level')
        console.log("It's been " + (Date.now() - userStats.last_message)/1000  + " Seconds since last message")
        console.log('')

    }


   



    //end lvl system   
    //start command system

    //don't respond to bots, they are spies

    if (message.author.bot) return;
         
    //make the messages lowercase, because toni can't read in uppercase

    const args = message.content;
    const command = args.toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command.includes('@everyone')) {
        client.commands.get('everyone').execute(message, args);
    } else if (command.includes('pasta')) {
        client.commands.get('pasta').execute(message, args);
    } else if (command.includes('candle')) {
        client.commands.get('candle').execute(message, args);
    } else if (command.includes('wiki')) {
        client.commands.get('wiki').execute(message, args);
    } else if (command.includes('toni') || command.includes("tony")) {
        client.commands.get('toni').execute(message, args);
    } else if (command.includes('im') || command.includes("i'm")) {
        client.commands.get('im').execute(message, args);
    } else if (command.includes('meatball')) {
        client.commands.get('meatball').execute(message, args);
    } else if (command.includes('daddy')) {
        client.commands.get('daddy').execute(message, args);
    }

    //prefix commands

    if (!command.startsWith(prefix)) {
        return
    } else {

        if (command.includes('roll')) {
            client.commands.get('roll').execute(message, args);
        } else if (command.includes('botlvl')) {
            client.commands.get('botlvl').execute(message, args);
        }else if (command.includes('lvl')) {
            client.commands.get('lvl').execute(message, args);
        }

    }
});



client.login('NzYzMjQ1OTUxNTczNjg4MzUw.X306Lw.7ZwLDlWtHeDYoFkck1bP1RNXG4M');