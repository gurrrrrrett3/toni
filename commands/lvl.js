module.exports = {
    name: 'lvl',
    description: "this shows lvl data!",
    execute(message, args){
       const fs = require('fs')
       
       
        message.channel.send('pong!');
    }
}