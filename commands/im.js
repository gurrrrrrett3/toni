module.exports = {
    name: 'im',
    description: "this is a response command!",
    execute(message, args){
   var rand = Math.floor(Math.random() * 3)
         message.channel.send(rand);
        if (rand == 2){

         const mess = message.content;
          const pos = mess.indexOf('im') + 3;
          const out = 'Hi, ' + mess.substring(pos,mess.length) + ", I'm Toni!";
         message.channel.send(out);
        }
        else 
        
        return;
    }
}