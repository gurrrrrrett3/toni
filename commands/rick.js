module.exports = {
    name: 'rick',
    description: "this is a ping command!",
    execute(message, args){
        
        const pasta = [ 
           "https://youtu.be/fZi4JxbTwPo",
           "https://youtu.be/2bfNgekJG4M",
           "https://youtu.be/wtOW1CxHvNY",
           "https://youtu.be/h8WiyX21A1c",
           "https://youtu.be/wzSVOcgKq04",
           "https://youtu.be/5uZr3JWYdy8",
           "https://youtu.be/7dY3IHhIRlo",
           "https://www.youtube.com/watch?v=oHg5SJYRHA0",
           "https://www.youtube.com/watch?v=EWMPVn1kgIQ"


     ]
        
        const result = pasta[Math.floor(Math.random() * 9)]    
        
        
        message.channel.send(result);
    }
}
