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

//Global toni settings



//Requires

//Discord js

const Discord = require('discord.js');
const client = new Discord.Client();

//Node File Service

const fs = require('fs');

//CUSTOM REACTION MENU

const menu = require(`./modules/reactionmenu.js`)

//dotenv

require("dotenv").config()

//end requires

const token = process.env.TOKEN

//command handler

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

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


//some other stuff

client.on("userUpdate", (user) => {
}) 

client.on("messageReactionAdd", (reaction, user) => {

   // menu.reactionUpdate(reaction)
   
})

//Token! (I need to add dotenv later...)
client.login(token);

