const { listenerCount } = require('process');

module.exports = {
    name: 'top',
    description: "This shows top 10 levels!",
    execute(message, args){
       const fs = require('fs');
       const jsonfile = require('jsonfile');

       if (fs.existsSync('stats.json')) {
        var stats = jsonfile.readFileSync('stats.json');
       
        var statsArray = Object.values(stats)
       
        statsArray.sort(function(a, b){return a.level - b.level});
        statsArray.reverse()

        //output 
        if (statsArray.length < 10) {
            message.channel.send('ERROR: List is not long enough.')
            return;
        }

        const out = "***TOP 10 TONI CHATTERS***\n" + "1. " +  statsArray[0].name + ": Level " + statsArray[0].level + "\n2. " +  statsArray[1].name + ": Level " + statsArray[1].level + "\n3. " +  statsArray[2].name + ": Level " + statsArray[2].level + "\n4. " +  statsArray[3].name + ": Level " + statsArray[3].level + "\n5. " +  statsArray[4].name + ": Level " + statsArray[4].level + "\n6. " +  statsArray[5].name + ": Level " + statsArray[5].level + "\n7. " +  statsArray[6].name + ": Level " + statsArray[6].level + "\n8. " +  statsArray[7].name + ": Level " + statsArray[7].level + "\n9. " +  statsArray[8].name + ": Level " + statsArray[8].level + "\n10. " +  statsArray[9].name + ": Level " + statsArray[9].level 

        message.channel.send(out);
        }
    }
}