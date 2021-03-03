 const Discord = require('discord.js');
    const random = require('random');
    const client = new Discord.Client();
    const low = require('lowdb')
    const FileAsync = require('lowdb/adapters/FileAsync')
    
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
    
    
    
    //JSON init
    
    //check ping
    //ugggh reaction collectors
    
    //end init
    //----------------------------------------
    //when toni sees, he reads
    
    client.on('message', message => {
    

        //NO DMING TONI 
    if (message.channel.type == 'dm' || message.channel.type == 'news') return;


        //word channel thing


        //toni is a horny motherfucker
    
        const hornyChance = Math.floor(Math.random() * 1000)
    
        if (hornyChance == 420) {
            message.channel.send("I'm horny motherfucker");
        }
        //log toni's own messages, toni never forgets
    
        if (message.author.bot) {
            console.log('RESPONSE: ' + message.content)
            console.log('')
            return
        }
        


        const args = message.content;
        const command = args.toLowerCase();
        //prefix commands
        if(command.includes('toni')) {
            message.channel.send("Ciao, sono Toni!")
        } else if (command.includes('pasta')) {
            client.commands.get('pasta').execute(message, args)
        } else if (command.includes('roll')) {
            client.commands.get('roll').execute(message, args);
        } else if (command.includes('recipe')) {
            client.commands.get('recipe').execute(message, args);
        } else if (command.includes(client.user.id)) {
            client.commands.get('mention').execute(message, args)
        }

    });
    

    
    client.login('NzYzMjQ1OTUxNTczNjg4MzUw.X306Lw.l-gywr0VUvSLRRKTaZNSK4mhddA');