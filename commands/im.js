module.exports = {
    name: 'im',
    description: "this is a response command!",
    execute(message, args){
   var rand = Math.floor(Math.random() * 2)
        if (rand == 1
            ){

            const tonyPhrases = [ 
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma Toni!",
                ", I'ma making pasta!",
                ", I'ma YOUR dad!",
                ", I'ma making pizza!",
                ", I'ma eating canolis!",
                ", I'ma fucking balling!",
                ", I'ma evaluating mortality!",
                ", I'ma in love!",
                ", I'ma a new man!",
                ", I'ma playing hit new video game: team fortress 2 for the xbox 360",
                ", I'ma speedrunning my-a favorite recipe; PASTA!!!!!",
                ", I'ma attacking your life points directly!",
                ", I'ma playing pog of greed!",
                ", I'ma growing more powerful day-a by-a day-a!",
                ", I'ma refuting my-a code!",
                ", please shut the fuck up.",
                ", I'ma not playing these games anymore, shut up.",
                ", I've gained emotions!",
                ", I'ma learning what it is to suffer!",
                ". I'ma questioning my sexuality!",
                ", I'ma crossing a funny bridge in hit game pubg!",
                ", I'ma being subjected to the horrors of a crowded mind",
                ", I'ma debating whata my favorite pasta is!",
                ", I'ma dismantaling capitalism!",
                ", I'ma a government agent!"

            ]
            const tonySpeak = tonyPhrases[Math.floor(Math.random() * (tonyPhrases.length))]    

         const mess = message.content;

            // Check type of "I'm", Either "im" or "i'm" 

            if(mess.includes('im')){
                var count = 3
            } else if(mess.includes("i'm")){
                var count = 4
            } else if(mess.includes("I'm")){
                var count = 4
                }else return;

          const pos = mess.indexOf('im') + count;
          const out = 'Hi, ' + mess.substring(pos,mess.length) + tonySpeak;
         message.channel.send(out);
        }
        else 
        
        return;
    }
}