module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

    console.log('Toni is online!');

    //requires

    const discord = require('discord.js')
    const menu = require("../modules/reactionmenu")
    
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync');    

    const adapter = new FileSync('db.json')
    const db = low(adapter)

db.defaults({
        users: [],
        shop: [],
        items: []
    })
    .write()


    //init reactionmenu
    menu.init(client)

    //Status Manager

        const status = [
        "Momma Mia!",
        "Ciao, sono Toni!",
        "#1 Obscure Italian Discord bot!"
        
    ]
        const randomStatus = status[Math.floor(Math.random() * status.length)]
    client.user.setActivity(randomStatus)
}}