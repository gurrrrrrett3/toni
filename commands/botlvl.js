  
module.exports = {
    name: 'botlvl',
    description: "this shows lvl data!",
    execute(message, args){
       const fs = require('fs')
       const jsonfile = require('jsonfile')

       if (fs.existsSync('stats.json')) {
        stats = jsonfile.readFileSync('stats.json');

        const toni = '763245951573688350'

        const userStats = stats[toni];
        const xpToNextLevel = (5* Math.pow(userStats.level, 2) + 50 * userStats.level + 100) - userStats.xp;
        const out = "```TONI PASTARONI'S STATS \nLevel: "+ userStats.level + "\nxp: " + userStats.xp + "\nToni needs "+ xpToNextLevel + " more xp points to level up!```"
        
        message.channel.send(out)
    }

       
        
    }
}