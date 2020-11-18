module.exports = {
    name: 'golf',
    description: "toni roll da dice",
    execute(message, args){
       
       //first, find the number after the roll command

        //var mess = message.content;
      //  const spos = mess.indexOf('roll') + 5;
       // const sides =  mess.substring(spos,mess.length);
        //const epos = mess.indexOf('') + 1;
        //const sides =  mess.substring(0,epos);
       
       //next, roll da dice

       var out = Math.floor(Math.random() * (14));
        const clubs = [
            "Driver" , "Putter" , "3 Wood", "5 Wood", "3 Iron", "4 Iron", "6 Iron", "7 Iron" , "8 Iron" , "9 Iron", "PW", "50", "56",  "60"
        ]
         
        out = clubs[out]

        message.channel.send(out)

        //keep out the filthy devils who try to use non numbers

       
    
    }
}