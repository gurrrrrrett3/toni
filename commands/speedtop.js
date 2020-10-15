const { listenerCount } = require('process');

module.exports = {
    name: 'speedtop',
    description: "This shows top 10 averages!",
    execute(message, args){
       const fs = require('fs');
       const jsonfile = require('jsonfile');

       if (fs.existsSync('speedstats.json')) {
        var speed = jsonfile.readFileSync('speedstats.json');
       
        var speedArray = Object.values(speed)
       
        speedArray.sort(function(a, b){return (a.total_score / a.total_times) - (b.total_score / total_times)});
        speedArray.reverse()

        //output 
        if (speedArray.length < 10) {
           message.channel.send('ERROR: List is not long enough.')
            return;
        }

        const out = "***TOP 10 SPEEDY BOIS***\n" + "1. " +  speedArray[0].name + ": Average " + speedArray[0].total_score / speedArray[0].total_times + "\n2. " +  speedArray[1].name + ": Average " + speedArray[1].total_score / speedArray[1].total_times + "\n3. " +  speedArray[2].name + ": Average " + speedArray[2].total_score / speedArray[2].total_times + "\n4. " +  speedArray[3].name + ": Average " + speedArray[3].total_score / speedArray[3].total_times + "\n5. " +  speedArray[4].name + ": Average " + speedArray[4].total_score / speedArray[4].total_times + "\n6. " +  speedArray[5].name + ": Average " + speedArray[5].total_score / speedArray[5].total_times + "\n7. " +  speedArray[6].name + ": Average " + speedArray[6].total_score / speedArray[6].total_times + "\n8. " +  speedArray[7].name + ": Average " + speedArray[7].total_score / speedArray[7].total_times + "\n9. " +  speedArray[8].name + ": Average " + speedArray[8].total_score / speedArray[8].total_times + "\n10. " +  speedArray[9].name + ": Average " + speedArray[9].total_score / speedArray[9].total_times 

        message.channel.send(out);
        }
    }
}