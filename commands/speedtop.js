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
       
        speedArray.sort(function(a, b){return (a.average) - (b.average)});
       // speedArray.reverse()

        //output 
        if (speedArray.length < 10) {
           message.channel.send('ERROR: List is not long enough.')
            return;
        }

        const out = "***TOP 10 SPEEDY BOIS***\n" + "1. " +  speedArray[0].name + ": Average " + speedArray[0].average + "ms\n2. " +  speedArray[1].name + ": Average " + speedArray[1].average + "ms\n3. " +  speedArray[2].name + ": Average " + speedArray[2].average + "ms\n4. " +  speedArray[3].name + ": Average " + speedArray[3].average + "ms\n5. " +  speedArray[4].name + ": Average " + speedArray[4].average + "ms\n6. " +  speedArray[5].name + ": Average " + speedArray[5].average + "ms\n7. " +  speedArray[6].name + ": Average " + speedArray[6].average + "ms\n8. " +  speedArray[7].name + ": Average " + speedArray[7].average + "ms\n9. " +  speedArray[8].name + ": Average " + speedArray[8].average + "ms\n10. " +  speedArray[9].name + ": Average " + speedArray[9].average

        message.channel.send(out);
        }
    }
}