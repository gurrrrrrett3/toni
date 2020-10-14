module.exports = {
    name: 'lvl',
    description: "this shows lvl data!",
    execute(message, args){
       const fs = require('fs')
       const jsonfile = require('jsonfile')

       if (fs.existsSync('stats.json')) {
        stats = jsonfile.readFileSync('stats.json');

        const userStats = stats[message.author.id];
        const xpToNextLevel = (5* Math.pow(userStats.level, 2) + 50 * userStats.level + 100) - userStats.xp;
        const out = "```" + message.author.username.toUpperCase() + "'S STATS \nLevel: "+ userStats.level + "\nxp: " + userStats.xp + "\nYou need "+ xpToNextLevel + " more xp points to level up!```"
    
        message.channel.send(out)
        }
    }
}