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

//dotenv

require("dotenv").config()

//end requires

const token = process.env.TOKEN


//event handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

//Alright! Everything has been moved to their respective files!
//If you are looking for the easy commands, check the message.js file!

client.login(token);