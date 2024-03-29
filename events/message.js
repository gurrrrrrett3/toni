module.exports = {
    name: 'message',
    once: false,
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.Client} client 
     * @returns void
     */
    execute(message, client) {

        //requires

        const Discord = require('discord.js');

        const global = require("../globaldata.json")

        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync');
        const adapter = new FileSync('db.json')
        const db = low(adapter)

        const _ = require('lodash')

        const func = require("../modules/functions")

        const fs = require("fs")

        const luni = require("lunicode")


        //globals

        const ver = global.ver
        const admins = global.admins
        const daily = global.daily
        const prefix = global.prefix

        //command handler

        client.commands = new Discord.Collection();

        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);

            client.commands.set(command.name, command);
        }

        //Level system

        //first, we need to check if it's a webhook or a news post, by checking their member data
        //as we still want bots to level up, because lol

        if (message.member == null) {
            return
        }

        //we also don't want toni do respond to DMs or items in news channels, so ignore them

        if (message.channel.type == 'dm' || message.channel.type == 'news' || message.channel.id == '818996409667420192') return;
        //alright now it's a real user, lets init some variables


        var users = db.get('users')
        var userdata = users.find({
            id: message.author.id
        }).value()

        var id = message.author.id

        //now we need to check if the user is in the database

        if (userdata === undefined) {
            //user doesen't exist in the database, create a new entry and update variables
            const userDefault = {
                id: message.author.id,
                nickname: message.member.user.username,
                messages: 0,
                level: 0,
                xp: 0,
                total_xp: 0,
                last_xp: 0,
                flair: 'This is the default flair! Use -flair to change it!',
                money: 250,
                bank: 0,
                last_daily: 0,
                last_intrest: 0,
                inventory: {}
            }
            users.push(userDefault).write(); //set database with new entry

            users = db.get('users') //update the database variable
            userdata = users.find({
                    id: message.author.id
                }).value() //update userdata

            console.log(`${message.member.user.username} didn't exist in the database, created an entry`)

        }

        //now check for mentions
        if (message.mentions.size > 0) {
            message.mentions.forEach(element => {
                if (users.find({id: element.id}).value() === undefined) {
                //user doesen't exist in the database, create a new entry and update variables
            const userDefault = {
                id: element.id,
                nickname: element.user.username,
                messages: 0,
                level: 0,
                xp: 0,
                total_xp: 0,
                last_xp: 0,
                flair: 'This is the default flair! Use -flair to change it!',
                money: 250,
                bank: 0,
                last_daily: 0,
                last_intrest: 0,
                inventory: {}
            }
            users.push(userDefault).write(); //set database with new entry
            console.log(`${element.user.username} didn't exist in the database, created an entry`)
                }
            });
        } 

        //Now we are sure the user is in the database, and we can update variables without errors

        const currentMessages = func.validate(userdata.messages + 1)
        var lastXp = func.validate(userdata.last_xp)
        const xp = func.validate(userdata.xp)
        var newLevel = func.validate(userdata.level)

        var newXp = xp

        if (Date.now() - lastXp > 60000) {
            //It's been over a minute since the user has gotten xp, so let's update it!

            const xpToGive = Math.ceil(Math.random() * 10) + 15 //gives a random number between 15 and 25
            newXp = xp + xpToGive


            //check if user has enough xp to level up

            const xpNeeded = 5 * (newLevel ^ 2) + 50 * newLevel + 100

            lastXp = Date.now()
                //level up the user, and subtract the correct amout of xp

            if (newXp >= xpNeeded) {

                newLevel = newLevel + 1
                newXp = newXp - xpNeeded

            }

        }

        //calculate current xp
        var totalXp = 0
        for (let index = 1; index <= newLevel; index++) {

            totalXp = totalXp + (5 * (index ^ 2) + 50 * index + 100)

        }
        totalXp = totalXp + newXp //add current xp


        //now we can save the new data to the database 

        users.find({
            id: id
        }).assign({
            messages: currentMessages,
            last_xp: lastXp,
            level: newLevel,
            xp: newXp,
            total_xp: func.validate(totalXp)
        }).write()

        //now we can run command stuff

        if (message.author.id == client.user.id && message.embeds.length > 0) {

            message.delete({
                timeout: 10000
            }).catch(err => {
                return
            })
        }

        //make toni redeem dailys ;)


        if ((message.author.id == client.user.id) && (Date.now() - userdata.last_daily > 72000000)) {

            users.find({
                id: id
            }).assign({
                money: func.validate(userdata.money) + global.daily,
                last_daily: Date.now()
            }).write()

            message.channel.send(func.embed("Success!", `Your balance is now: \`$${func.validate(userdata.money)}\`!`, '#00FF00', client))
        }

        //log toni's own messages, to make sure we are getting the responses we want

        if (message.author.id == client.user.id) {
            console.log('RESPONSE: ' + message.content)
            return
        }

        //basic commands, just checking for a word and responding to it. 
        //The code for these are in the commands folder


        const msg = message.content;
        const command = msg.toLowerCase();
        const args = command.replace(global.prefix, '').split(' ')

        if (!command.startsWith(global.prefix)) { //this will ignore the non prefix commands 
            // if the command starts with the prefix

            if (command.includes('toni')) {
                message.channel.send("Ciao, sono Toni!")
            } else if (command.includes('ping')) {
                client.commands.get('ping').execute(message, args)
            } else if (command.includes('pasta')) {
                client.commands.get('pasta').execute(message, args)
            } else if (command.includes('roll')) {
                client.commands.get('roll').execute(message, args);
            } else if (command.includes('recipe')) {
                client.commands.get('recipe').execute(message, args);
            } else if (command.includes(client.user.id)) {
                client.commands.get('mention').execute(message, args)
            } else if (command.includes('broken')) {
                client.commands.get('broken').execute(message, args)
            } else if (command.includes('mama mia')) {
                client.commands.get('mama mia').execute(message, args);
            } else if (command.includes('mama')) {
                client.commands.get('mama').execute(message, args);
            } else if (command.includes('italy')) {
                client.commands.get('flag').execute(message, args);
            } else if (command.includes('angel hair')) {
                client.commands('Angel hair').execute(message, args)
            } else if (command.includes('zatch')) {
                client.commands.get('zatch').execute(message, args);
            } else if (command.includes('meatball')) {
                client.commands.get('meatball').execute(message, args)
            } else if (command.includes('rick')) {
                client.commands.get('rick').execute(message, args)
            } else if (command.includes('discord')) {
                client.commands.get('discord').execute(message, args)
            } else {




                //Now for some non prefix commands that either need the database or additional info about the message.

                //I'm command
                if (command.includes("i'm ") || command.includes("im ") || command.includes("i’m ")) {
                    var im
                    var length

                    if (command.includes("i'm")) {
                        length = 4
                        im = "i'm"
                    } else {
                        length = 3
                        im = "im"
                    }

                    const name = message.content.slice(command.indexOf(im) + length, command.length)

                    const responses = [
                        ", Sono Toni!",
                        ", I'ma baking a pizza!",
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
                        ", I'ma questioning my sexuality!",
                        ", I'ma crossing a funny bridge in hit game pubg!",
                        ", I'ma being subjected to the horrors of a crowded mind",
                        ", I'ma debating whata my favorite pasta is!",
                        ", I'ma dismantaling capitalism!",
                        ", I'ma a government agent!"
                    ]

                    const response = responses[Math.floor(Math.random() * responses.length)]

                    message.channel.send(`Hi ${name}${response}`)

                }


            }
        } else {

            //The command starts with the prefix

            //now we can run the commands in this file instead of branching off, as there will be less of them

            //-----------------//
            //* LEVEL COMMAND *//
            //-----------------//

            if (args[0] == 'level') {

                //grab the database, as it will have updated

                //User database

                users = db.get('users')


                //if the user mentioned someone, we want to grab their data instead!

                if (message.mentions.members.size > 0) {
                    id = message.mentions.members.first().id
                }

                //User object

                userdata = users.find({
                    id: id
                }).value()


                //send a message with the data, 
                //I'm not going to use the embed function here
                //as I want to use an image

                const xpNeeded = (5 * (userdata.level ^ 2) + 50 * userdata.level + 100) - userdata.xp

                const levelEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.members.cache.get(id).displayName}'s Level`)
                    .setTitle(userdata.nickname)
                    .setDescription(`"${userdata.flair}"`)
                    .addFields({
                            name: 'Level: ',
                            value: userdata.level
                        }, {
                            name: 'XP: ',
                            value: userdata.xp
                        }, {
                            name: 'XP needed to level up: ',
                            value: xpNeeded
                        }, {
                            name: 'Total XP: ',
                            value: func.makeThousands(userdata.total_xp)
                        }

                    )
                    .setColor(message.guild.members.cache.get(id).displayHexColor)
                    .setThumbnail(message.guild.members.cache.get(id).user.avatarURL())
                    .setTimestamp()
                    .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                //send it!

                message.channel.send(levelEmbed)
                message.delete({
                    reason: "Message deleted by Toni."
                })

            }


            //--------------------//
            //* PROFILE COMMAND *//
            //------------------//

            if (args[0] == 'profile' || args[0] == 'money') {

                //almost the same as the level command,
                //just in a diffrent format

                //grab the database, as it will have updated

                //User database

                users = db.get('users')

                //if the user mentioned someone, we want to grab their data instead!

                if (message.mentions.members.size > 0) {
                    id = message.mentions.members.first().id
                }
                //User object

                userdata = users.find({
                    id: id
                }).value()

                const time = func.parseTime(72000000 - (Date.now() - func.validate(userdata.last_daily)))

                const profileEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.members.cache.get(id).displayName}'s Profile`)
                    .setTitle(userdata.nickname)
                    .setDescription(`"${userdata.flair}"`)
                    .addFields({
                        name: 'Level: ',
                        value: userdata.level,
                        inline: true
                    }, {
                        name: 'XP: ',
                        value: userdata.xp,
                        inline: true
                    }, {
                        name: 'Messages: ',
                        value: userdata.messages,
                        inline: true
                    })
                    .addFields({
                        name: 'Balance: ',
                        value: func.validate(userdata.money),
                        inline: true
                    }, {
                        name: 'Bank: ',
                        value: func.validate(userdata.bank),
                        inline: true
                    }, {
                        name: 'Time until Daily: ',
                        value: `${time[0]}:${time[1]}:${time[2]}`,
                        inline: true
                    })
                    .setColor(message.guild.members.cache.get(id).displayHexColor)
                    .setThumbnail(message.guild.members.cache.get(id).user.avatarURL())
                    .setTimestamp()
                    .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                //send it!

                message.channel.send(profileEmbed)
                message.delete({
                    reason: "Message deleted by Toni."
                })

            }

            //-----------------//
            //* FLAIR COMMAND *//
            //-----------------//

            if (args[0] == 'flair') {
                //this command lets you set your flair,
                //which is the text in quotes under your
                //name in the level and profile commands

                //if the user doesn't set a flair, just display 
                //their current flair as a mini profile

                if (!args[1]) {
                    const miniProfileEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.member.displayName}'s Flair`)
                        .setTitle(userdata.nickname)
                        .setDescription(`"${userdata.flair}"`)
                        .setColor(message.member.displayHexColor)
                        .setThumbnail(message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                    message.channel.send(miniProfileEmbed)
                    message.delete({
                        reason: "Message deleted by Toni."
                    })
                } else {

                    //The user has specified a flair, so let's change it!

                    const flairText = message.content.replace(`-flair `, '')

                    users.find({
                        id: id
                    }).assign({
                        flair: flairText
                    }).write()

                    //now we can display it, we don't need to grab the databse,
                    //because we have it in a variable!

                    const miniProfileEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Updated your Flair!`)
                        .setTitle(userdata.nickname)
                        .setDescription(`"${flairText}"`)
                        .setColor(message.member.displayHexColor)
                        .setThumbnail(message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                    message.channel.send(miniProfileEmbed)
                    message.delete({
                        reason: "Message deleted by Toni."
                    })

                }

            }

            //--------------------//
            //* NICKNAME COMMAND *//
            //--------------------//

            if (args[0] == 'nickname') {

                //this command lets the user change the nickname
                //displayed on their profile and user page!

                //We don't need the database, as we have it from 
                //updating the database for level data!

                //If the user didn't specify a username, just 
                //show a mini profile with their current nickname

                if (!args[1]) {
                    const miniProfileEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.member.displayName}'s Nickname`)
                        .setTitle(userdata.nickname)
                        .setDescription(`"${userdata.flair}"`)
                        .setColor(message.member.displayHexColor)
                        .setThumbnail(message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                    message.channel.send(miniProfileEmbed)
                    message.delete({
                        reason: "Message deleted by Toni."
                    })
                } else {

                    //The user has specified a nickname!, so let's change it!

                    const nickText = message.content.replace(`-nickname `, '')

                    users.find({
                        id: id
                    }).assign({
                        nickname: nickText
                    }).write()

                    //now we can display it, we don't need to grab the databse,
                    //because we have it in a variable!

                    const miniProfileEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Updated your Nickname!`)
                        .setTitle(nickText)
                        .setDescription(`"${userdata.flair}"`)
                        .setColor(message.member.displayHexColor)
                        .setThumbnail(message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                    message.channel.send(miniProfileEmbed)
                    message.delete({
                        reason: "Message deleted by Toni."
                    })

                }



            }

            //-----------------//
            //* DAILY COMMAND *//
            //-----------------//

            if (args[0] == 'daily') {

                //The user can run this command once a day, and will get 
                //an amount of money from it.


                if (Date.now() - func.validate(userdata.last_daily) > 72000000) {

                    //user hasn't gotten the daily yet, so give it to them,
                    //as well as setting the timer.

                    users.find({
                        id: id
                    }).assign({
                        money: func.validate(userdata.money) + global.daily,
                        last_daily: Date.now()
                    }).write()

                    message.channel.send(func.embed("Success!", `Your balance is now: \`$${func.validate(userdata.money)}\`!`, '#00FF00',client))

                    message.delete({
                        reason: "Message deleted by Toni."
                    })

                } else {
                    //user has already gotten the daily
                    // so let them know how long it is until
                    //they can run the command again.

                    const time = func.parseTime(72000000 - (Date.now() - func.validate(userdata.last_daily)))
                    message.channel.send(func.embed("Not Yet!", `You still have ${time[0]} hours, ${time[1]} minutes, and ${time[2]} seconds until you can claim your Daily!`, '#FFA000', client))
                    message.delete({
                        reason: "Message deleted by Toni."
                    })
                }


            }

            //----------------//
            //* TOP COMMAND *//
            //--------------//


            if (args[0] == 'top') {

                //get the top 10 items from the database, sorted by [level + xp]
                //then send them in an embed


                //get the top 10 user's id's
                users = db.get('users')
                const topUsers = users.orderBy(['total_xp'], ['desc', 'asc']).take(10).map('id').value()
                var i = 1

                const topEmbed = new Discord.MessageEmbed()

                .setTitle(`Top 10 Users`)
                    .setDescription(`These are the top 10 users with the most xp!`)
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setFooter(`Toni | Version: ${ver}`, client.user.avatarURL())

                topUsers.forEach(element => {
                    const topdata = users.find({
                        id: element
                    }).value()

                    topEmbed.addFields({
                        name: i,
                        value: `**${topdata.nickname}**\nLevel: ${topdata.level}\nXP: ${topdata.xp}\nTotal XP: ${func.makeThousands(topdata.total_xp)}`,
                        inline: true
                    })

                    i++

                });

                message.channel.send(topEmbed)
                message.delete({
                    reason: "Message deleted by Toni."
                })
            }

            //cursed command

            if (args[0] == 'curse') {
                if (message.mentions.members.size > 0) {
                    const user = message.mentions.members.first()

                    console.log(user)

                    luni.tools.creepify.options.maxHeight = 2

                    const start = user.displayName
                    message.channel.send(`\`\`\`Cursing ${start}... \`\`\``)
                    var cursing = luni.tools.creepify.encode(start)
                    message.channel.send(cursing)
                    
                    if (cursing.length > 32) {
                        message.channel.send(`\`\`\`Sorry, your username is too long to curse. Here is what it would have looked like! ${cursing} \`\`\``)
                    } else {
                    
                    message.channel.send(`\`\`\`Done! New username: ${cursing} \`\`\``)
                    user.setNickname(cursing)

                    }

                    
                } else {
                    message.channel.send("You need to mention a user to curse them!")
                }
            }


            //--------------//
            //* K COMMAND *//  DISABLED
            //------------//

            /*

            if (args[0] == 'k') {
                if (client.user.lastMessage == null ) {return}
                client.user.lastMessage.delete()
                message.delete({reason: "Message deleted by Toni."})


            }
            */


            /*
               *----------------*
               I ADMIN COMMANDS I
               *----------------*

               Admin access only past this point!
               Edit Admin list at the top of the code!

               */

            if (!global.admins.includes(message.author.id)) {
                return
            }

            //Stop command 
            if (args[0] == 'nyquil') {

                message.channel.send('Hey, what are you doing with that NyQuil?')
                setTimeout(function() {
                    message.channel.send('Why are you putting it in that syringe?')
                    setTimeout(function() {
                        message.channel.send('HEY! STopp.... zzzzz')
                        setTimeout(function() {
                            process.exit(-1)
                        }, 1000)

                    }, 3000);

                }, 3000);




            }

            //ADD ITEM COMMAND

            if (args[0] == 'additem') {

                //load item db

                var items = db.get('items')

                if (!args[2]) {
                    message.channel.send(func.embed("Error", "Missing arguements", "#FF0000", client))
                } else {
                    const itemID = _.size(items.value())
                    const itemName = args[1].replace('_', ' ')
                    items.push({
                        id: itemID,
                        name: args[1],
                        price: args[2]
                    }).write()

                    message.channel.send(func.embed("Created Item!", `Name: ${itemName}\nPrice: $${args[2]}\nID: ${itemID}`, client))
                }


            }

        }


    }
}