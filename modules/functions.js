//functions!

module.exports = {
    
    embed(title, description, color) {
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter(`Toni | Version: ${globaldata.ver}`, client.user.avatarURL())
    
        return embed
    },
    
    systemInfo() {
    
        const info = {
            version: process.version,
            ram: process.memoryUsage(),
            cpu: process.cpuUsage()
    
        }
        return info
    },
    parseTime(ms) {
        const h = Math.floor(ms / 3600000)
        const m = Math.floor((ms % 3600000) / 60000)
        const s = Math.floor(((ms % 3600000) % 60000) / 1000)
    
        return [h, m, s]
    },
    validate(item) {
    
        if (item === null || item === undefined || item === NaN) {
            return 0
        } else return item
    
    },

    makeThousands(number) {
        if (number > 999) {
    
            return `${(Math.round(number / 10) )/100}k`
    
        } else return number
    }

}
