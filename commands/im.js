module.exports = {
    name: 'im',
    description: "this is a response command!",
    execute(message, args){
   //var rand = Math.floor(Math.random() * 3)
       // if (rand == 2){

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
                ", I'ma playing hit new video game: team fortress 2 for the xbox 360"

            ]
            const tonySpeak = tonyPhrases[Math.floor(Math.random() * (tonyPhrases.length))]    

         const mess = message.content;

            // Check type of "I'm", Either "im" or "i'm"

            if(mess.includes('im')){
                var count = 3
            } else if(mess.includes("i'm")){
                var count = 5
                }else return;

          const pos = mess.indexOf('im') + count;
          const out = 'Hi, ' + mess.substring(pos,mess.length) + tonySpeak;
         message.channel.send(out);
      //  }
       // else 
        
     //   return;
    }
}