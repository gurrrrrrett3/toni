module.exports = {
    name: 'lvl',
    description: "this shows lvl data!",
    execute(message, args){
       const fs = require('fs')
       const jsonfile = require('jsonfile')

       if (fs.existsSync('stats.json')) {
        stats = jsonfile.readFileSync('stats.json');

        if (message.mentions.members.first()) {
            var user = message.mentions.users.first().id
           // if (!Object.values(stats).includes(user)) return;
        } else {
            var user = message.author.id;
        }
            
        const userStats = stats[user]
        const xpToNextLevel = (5* Math.pow(userStats.level, 2) + 50 * userStats.level + 100) - userStats.xp;
        const out = "```" + userStats.name.toUpperCase() + "'S STATS \nLevel: "+ userStats.level + "\nxp: " + userStats.xp + "\nYou need "+ xpToNextLevel + " more xp points to level up!```"
    
        message.channel.send(out)
        }
    }
}