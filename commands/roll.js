module.exports = {
    name: 'roll',
    description: "toni roll da dice",
    execute(message, args){
       
       //first, find the number after the roll command

        var mess = message.content;
        const spos = mess.indexOf('roll') + 5;
        const sides =  mess.substring(spos,mess.length);
        //const epos = mess.indexOf('') + 1;
        //const sides =  mess.substring(0,epos);
       
       //next, roll da dice

       var out = Math.floor(Math.random() * (sides)) + 1;

         

        //keep out the filthy devils who try to use non numbers

        if(Number.isInteger(out)){
            
       message.channel.send('Toni is rolling a die with ' + sides + ' sides...');
        message.channel.send('You rolled a ' + out + '!');

        } else {
        
        //output results
        message.channel.send("Mamma Mia! That's not a number!")
        return
        
        }
    
    }
}