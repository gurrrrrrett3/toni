/*

████████╗░█████╗░███╗░░██╗██╗
╚══██╔══╝██╔══██╗████╗░██║██║
░░░██║░░░██║░░██║██╔██╗██║██║
░░░██║░░░██║░░██║██║╚████║██║
░░░██║░░░╚█████╔╝██║░╚███║██║
░░░╚═╝░░░░╚════╝░╚═╝░░╚══╝╚═╝ 

The #1 obscure italian Discord bot

- Creator: Gucci Garrett#9211

- Programmers: JLaqua7, Shellos03, Amari

*/

//Requires

//Discord js

const Discord = require('discord.js');
const client = new Discord.Client();

//Node File Service

const fs = require('fs');

//lowdb

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//end requires

//lowdbdb init

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
        users: []
    })
    .write()


//prefix, might use later, although not being used now.

const prefix = '-'

//command handler

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


//Alright, let's get the bot started!

client.once('ready', () => {
    console.log('Toni is online!');

    //Status Manager
    
    //   const status = [
    //       "Momma Mia!",
    //       "Ciao, sono Toni!",
    //      "#1 Obscure Italian Discord bot!"
    //   ]

    //const randomStatus = status[random.int(0,status.length)]
    //client.user.setStatus('online', randomStatus)

});

//Let's get on to event handling!

//This is the important one, when a message is sent!

client.on('message', message => {

    //Level system

    //first, we need to check if it's a webhook or a news post, by checking their member data
    //as we still want bots to level up, because lol

    if (message.member == null) {
        return
    }

    //we also don't want toni do respond to DMs or items in news channels, so ignore them

    if (message.channel.type == 'dm' || message.channel.type == 'news') return;
    //alright now it's a real user, lets init some variables


    var users = db.get('users')
    var userdata = users.find({
        id: message.author.id
    }).value()

    const id = message.author.id

    //now we need to check if the user is in the database

    if (userdata === undefined) {
        //user doesen't exist in the database, create a new entry and update variables
        const userDefault = {
            id: message.author.id,
            nickname: message.member.user.username,
            messages: 0,
            level: 1,
            xp: 0,
            last_xp: 0
        }
        users.push(userDefault).write(); //set database with new entry

        users = db.get('users') //update the database variable

        user = users.find({
                id: message.author.id
            }) //update the user object

        userdata = users.find({
                id: message.author.id
            }).value() //update userdata

        console.log(`User didn't exist in the database, created an entry: \n${userdata}`)

    }

    //Now we are sure the user is in the database, and we can update variables without errors

    const currentMessages = userdata.messages + 1
    var lastXp = userdata.last_xp
    const xp = userdata.xp
    var newLevel = userdata.level

    var newXp = xp

    if (Date.now() - lastXp > 60000) {
        //It's been over a minute since the user has gotten xp, so let's update it!

        const xpToGive = Math.ceil(Math.random() * 10) + 15 //gives a random number between 15 and 25
        newXp = xp + xpToGive

        //check if user has enough xp to level up

        const xpNeeded = 5 * (newLevel ^ 2) + 50 * newLevel + 100

        lastXp = Date.now()
            //level up the user, and subtract the correct amout of xp

        if (newXp >= xpNeeded) {

            newLevel = newLevel + 1
            newXp = newXp - xpNeeded

        }
    }

    //now we can save the new data to the database 

    users.find({
        id: id
    }).assign({
        messages: currentMessages,
        last_xp: lastXp,
        level: newLevel,
        xp: newXp
    }).write()

    //now we can run command stuff

    //log toni's own messages, to make sure we are getting the responses we want

    if (message.author.id == client.user.id) {
        console.log('RESPONSE: ' + message.content)
        return
    }


    //basic commands, just checking for a word and responding to it. 
    //The code for these are in the commands folder


    const args = message.content;
    const command = args.toLowerCase();


    if (command.includes('toni')) {
        message.channel.send("Ciao, sono Toni!")
    } else if (command.includes('pasta')) {
        client.commands.get('pasta').execute(message, args)
    } else if (command.includes('roll')) {
        client.commands.get('roll').execute(message, args);
    } else if (command.includes('recipe')) {
        client.commands.get('recipe').execute(message, args);
    } else if (command.includes(client.user.id)) {
        client.commands.get('mention').execute(message, args)
    } else if (command.includes('broken')) {
        client.commands.get('broken').execute(message, args)
    } else if (command.includes('mama mia')) {
        client.commands.get('mama mia').execute(message, args);
    } else if (command.includes('mama')) {
        client.commands.get('mama').execute(message, args);
    } else if (command.includes('italy')) {
        client.commands.get('flag').execute(message, args);
    } else if (command.includes('angel hair')) {
        client.commands('Angel hair').execute(message, args)
    }
});


//Token! (I need to add dotenv later...)
client.login('NzYzMjQ1OTUxNTczNjg4MzUw.X306Lw.l-gywr0VUvSLRRKTaZNSK4mhddA');