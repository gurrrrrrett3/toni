module.exports = {
    
    /**
     * @param {Discord.Client} client
     */
    init(client){
        const Discord = require('discord.js') 
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync');
        const adapter = new FileSync('modules/reactionMenudb.json')
        const db = low(adapter)

        db.defaults({
            menus: []
            })
            .write()
        
        var menus = db.get('menus')


        console.log(`ReactionMenu is ready on user: ${client.user.username}`)
        
        return
    },    
    /**
     * @param {Discord.MessageReaction} reaction 
     */
    reactionUpdate(reaction) {

    const menuButtons = {
        first: "⏪",
        last: "⏩",
        back: "◀️", 
        next: "▶️"  
    }
    
    //const Discord = require('discord.js')

    if (reaction.message.author.id == client.user.id || reaction.message.embeds.length > 0) {
        const action = reaction.emoji.name
        console.log(action)
    }
    return
    },

    addReactionMenu(dataArray, pages){

    }





}

