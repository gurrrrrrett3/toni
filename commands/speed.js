module.exports = {
    name: 'speed',
    description: "speed shows lvl data!",
    execute(message, args){
       const fs = require('fs')
       const jsonfile = require('jsonfile')

       if (fs.existsSync('speedstats.json')) {
        stats = jsonfile.readFileSync('speedstats.json');

        if (message.mentions.members.first()) {
            var user = message.mentions.users.first().id
           // if (!Object.values(stats).includes(user)) return;
        } else {
            var user = message.author.id;
        }
        
        const userStats = stats[user]
        const average = Math.round(100 - (userStats.total_score / userStats.total_times))* 10;
        if (average == null) {average = 999999}
        const out = "```" + userStats.name.toUpperCase() + "'S SPEED STATS \nTotal Reacions: "+ userStats.total_times + "\nTotal Score: " + userStats.total_score + "\nAverage Speed " + average + "ms```"
        
        userStats.average = average;
        message.channel.send(out)
        }
    }
}