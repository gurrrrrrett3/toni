module.exports = {
    name: 'candle',
    description: "this is a ping command!",
    execute(message, args){
        
        const candle = [ 
            "Flameless Candle",
            "Tea Light Candle",
            "Votive Candle",
            "Taper Candle",
            "Candle Pot Candle",
            "Pillar Candle",
            "Birthday Candle",
            "Floating Candle",
            "Paraffin Wax Candle",
            "Palm Wax Candle",
            "Soy wax Candle",
            "Bayberry Wax Candle",
            "Beeswax Candle",
            "Liquid Wax Candle",
            "Wood Wick Candle",
            "Cotton Core Wick Candle",
            "Paper Core Wick Candle",
            "Metal Core Wick Candle",
            "Scented Candle",
            "Unscented Candle",
            "Set Candles",
            "Themed Candle",
            "Dripless Candle",
            "Insect Repellent Candle",
            "Waxton Candle"
     ]
        
        const result = candle[Math.floor(Math.random() * 25)]    
        
        
        message.channel.send(result);
    }
}