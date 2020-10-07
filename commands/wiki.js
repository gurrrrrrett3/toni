module.exports = {
    name: 'wiki',
    description: "this is a ping command!",
    execute(message, args){
        
        const pasta = [ 
            "Cock and ball torture (CBT), penis torture or dick torture is a sexual activity involving application of pain or constriction to the penis or testicles. This may involve directly painful activities, such as genital piercing, wax play, genital spanking, squeezing, ball-busting, genital flogging, urethral play, tickle torture, erotic electrostimulation, kneeing or kicking.[1] The recipient of such activities may receive direct physical pleasure via masochism, or emotional pleasure through erotic humiliation, or knowledge that the play is pleasing to a sadistic dominant. Many of these practices carry significant health risks.[2]",
            "There is a large variety of pasta products that require slightly different production methods. However, the main ingredients for all of them are: durum wheat semolina, eggs and water. The reason why durum wheat is used in pasta production comes from the fact that the grain of the durum wheat is hard but also rich in gluten content which provides elasticity to the dough. Spaghetti, noodles, macaroni and vermicelli – they all contain these basic raw ingredients. An interesting thing concerning pasta production in some countries is that only the above-mentioned ingredients are allowed to be used for pasta production. Countries like Greece, Germany and even Italy have strict legal regulations regarding this aspect of production. Of course, herbs and sauces may be added later.",
            "Pasta has evolved beyond a simple meal – it’s a tradition, even a cult. There are chefs that dedicate their entire careers to making heavenly pasta and inventing new recipes and combinations. The large variety of pasta types and sauces makes this particular dish one of the most complex ones in cooking history. Pasta cooking competitions are common in many countries around the world and amateur to professional cooks participate in such events.",
            "Pasta machines are a great tool that will reduce the time you invest in making pasta. You can go for a hand operated machine that clamps to a work surface (table). You manually crank the dough through rollers until you get the pasta thinness you were after. A bit limited in pasta type production, hand operated pasta machines will still produce the most popular pasta types: spaghetti, taglierini, and lasagna. The main disadvantage with such machines is that you need to prepare the dough yourself.",
            "Motorized pasta machines don’t require you to prepare the dough – simply poor in the ingredients and the machine will handle the rest. You can choose different nozzles and make cylindrical types of pasta such as penne. Attachments for making other pasta types are also available."
     ]
        
        const result = pasta[Math.floor(Math.random() * 5)]    
        
        
        message.channel.send(result);
    }
}