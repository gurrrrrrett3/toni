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

//   const status = [
//       "Momma Mia!",
//       "Ciao, sono Toni!",
//      "#1 Obscure Italian Discord bot!"
//   ]

//const randomStatus = status[random.int(0,status.length)]
//client.user.setStatus('online', randomStatus)

});



//level init

var stats = {};
if (fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');

}

var speedStats = {};
if (fs.existsSync('speedstats.json')){
    speedStats = jsonfile.readFileSync('speedstats.json');

}

var words = {};
if (fs.existsSync('words.json')){
    words = jsonfile.readFileSync('words.json');

}


//check ping
//ugggh reaction collectors

//end init
//----------------------------------------
//when toni sees, he reads

client.on('message', message => {


    //NO DMING TONI 
if (message.channel.type == 'dm' || message.channel.type == 'news') return;

    //list of channel IDs to run the word game in

    const wordChannels = [
        "766737470842208287"
    ]

    //characters toni wants in his words 

    const leagalCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "'", "-", "\n", '"', ","]

    //if the message is in one of the specified word channels, intercept it, even if it's a command.

        if (wordChannels.includes(message.channel.id)) {
            const text = message.content.toLowerCase()

            for (var i = 0 ; i <= text.length; i ++) {
                if (leagalCharacters.includes(text.charAt(i)) == false){
                   message.delete()
                    return 
                }
                console.log(i + " " + text.charAt(i))
            }
            return
        }

    //toni is a horny motherfucker

    const hornyChance = Math.floor(Math.random() * 1000)

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
                name: message.author.username,
                id: message.author.id,
                xp: 0,
                level: 0,
                last_message: 0
                
            }
        }
        
        if(message.author.id in speedStats === false) {
            speedStats[message.author.id] = {
                name: message.author.username,
                id: message.author.id,
                total_times: 0,
                total_score: 0,
                average: 0
                
            }
        }

        const userStats = stats[message.author.id];
        if(Date.now() - userStats.last_message >= 60000){
        userStats.xp += random.int(15,25);
        userStats.last_message = Date.now();
        
        const userSpeedStats = speedStats[message.author.id]

        message.react('⏺️')
        


        


        const filter = (reaction, user) => {
            return ['⏺️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        

        message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '⏺️') {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            const amount = (100 - (Math.ceil((Date.now() - userStats.last_message) / 100)))
            
            var numbers = [
            "0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣", "766341411887906826", "766341411728654368", "766341412052533279", "766341411791962173", "766341411930767411", "766341411884367914", "766341411897344000", "766341411900751912", "766341411598893078", "766341411762733057"
            ]

            const tens = Math.floor(amount / 10)
            const ones = amount % 10

            message.react(numbers[tens]) .then(() => message.react(numbers[ones + 10])).catch(error => console.error('Reaction error', error));

            console.log(amount)
            userStats.xp = userStats.xp + amount
            userSpeedStats.total_times ++
            userSpeedStats.total_score = userSpeedStats.total_score + amount

            //numbers go away

            
            }

             })
             .catch(collected => {
                
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            });

            var numbers = [
                "0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣", "766341411887906826", "766341411728654368", "766341412052533279", "766341411791962173", "766341411930767411", "766341411884367914", "766341411897344000", "766341411900751912", "766341411598893078", "766341411762733057"
                ]
        
            const filter2 = (reaction, user) => {
                return [numbers].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            message.awaitReactions(filter2, { max: 1, time: 10000, errors: ['time'] })

            .catch(collected => {
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));;
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
        
        userSpeedStats.average =(userStats.total_score / userStats.total_times);

        jsonfile.writeFileSync('speedstats.json', speedStats)

        console.log(message.author.username + " now has " + userSpeedStats.total_score + " after reacting to " + userSpeedStats.total_times + " challenges")
        
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
        }else if (command.includes('speedtop')) {
            client.commands.get('speedtop').execute(message, args);
        }else if (command.includes('top')) {
            client.commands.get('top').execute(message, args);
        }else if (command.includes('speed')) {
            client.commands.get('speed').execute(message, args);
        }//else if (command.includes('animal')) {
           // client.commands.get('animal').execute(message, args);
        //}  ANIMAL DISABLED
    }
});



client.login('NzYzMjQ1OTUxNTczNjg4MzUw.X306Lw.7ZwLDlWtHeDYoFkck1bP1RNXG4M');