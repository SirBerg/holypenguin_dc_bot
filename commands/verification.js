const Discord = require('discord.js')
let mysql = require('mysql');
module.exports ={
    name: 'verification',
    description: 'tba',
    execute(message,args){
        let filter = m => m.author.id === message.author.id
        let embed = new Discord.MessageEmbed()
        let embed2 = new Discord.MessageEmbed()
        let embed3 = new Discord.MessageEmbed()
        let embed4 = new Discord.MessageEmbed()
        var sql = mysql.createConnection({
            host: "localhost",
            user: "rcon",
            password: "Smaug-1RCON",
            database: "rcon"
        });
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
    }
        sql.connect(async function (err){
            if(err){
                throw err
                return
            }
            console.log('Connected to MYSQLDATABASE')


        
        
        
        embed.setColor('#000000')
        embed.setTimestamp()
        embed.setTitle('Verifizierung')
        embed.setDescription('Willkommen zum Verifizierungsprozess des Holypenguin Networks!')
        embed.addFields({name:'Anleitung:', value: 'Bitte habe in den nächsten schritten dein Token und deine GameID parat'})
        embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
        embed.setURL('https://www.holypenguin.de')
        embed.setFooter('Schritt 0 von ')

        embed2.setTitle('Schritt 1')
        embed2.setDescription('Bitte schicke hier in diesen Channel dein Token')
        embed2.setColor('#000000')
        embed2.setTimestamp()
        embed2.setURL('https://www.holypenguin.de')
        embed2.setFooter('Schritt 1 von')

        embed3.setTitle('Schritt 2')
        embed3.setDescription('Bitte gib hier deine GameID an')
        embed3.setURL('https://www.holypenguin.de')
        embed3.setColor('#000000')
        embed3.setTimestamp()
        embed3.setFooter('Schritt 2 von')
        
        embed4.setTitle('Bestätigung')
        embed4.setDescription('Der Folgende Gameserver wird hiermit mit deinem Discord Konto verbunden:')
        embed4.setColor('#000000')
        embed4.setTimestamp()
        embed4.setFooter('Schritt 3 von')
              
        if(message.channel.type === "dm"){
            const collector = message.channel.createMessageCollector(filter, { time: 15000 });
            const collector2 = message.channel.createMessageCollector(filter, {time: 15000})
            message.channel.send(embed)
            message.channel.send(embed2)
            let row
            let file = require('verification_1.js')
            let id
            let i = 0
            let error_code = 0
            collector.on('collect',async message =>{
                if(message.author.bot){
                    return
                }
                console.log(message.content)
                async function eins(content1){
                let content = '"'+content1+'"'
                
                sql.query('SELECT ID FROM Users WHERE usrGetKey = '+content , async function(err,result, field){
                    if(err){
                        console.log(err)
                        return
                    }
                    if(result.length === 0){
                    Object.keys(result).forEach(function(key){
                        row = result[key]
                        
                    })}
                    if(error_code!==0){
                    message.channel.send('Da ist wohl etwas schiefgelaufen :(')}

                    else{
                    Object.keys(result).forEach(function(key){
                        row = result[key]
                        
                    })
                    console.log(row.ID)
                    id = row.ID
                    error_code === 0
                }} )}
                let gmID
                function zwei(content){
                message.channel.send(embed3)
                let content2 = '"'+content+'"'
                   sql.query('SELECT * FROM User2Games WHERE ID = '+content2, async function(err, result, fields){
                    if(err){
                        console.log(err)
                        return
                    }   
                    let row2
                       await sleep(500)
                    Object.keys(result).forEach(function(key){
                        row2 = result[key]
                        
                    })
                    if (row2.usrID === id){
                        message.channel.send('ERFOLGREICH!')
                    }
                    else{
                        message.channel.send('FEHLER!')
                    }
                    gmID = row.ID

                   })}
                   async function drei(content){
                    embed4.addFields({name: 'Dein Token: ', value: id})   
                    embed4.addFields({name:'Server ID', value: gmID})
                    embed4.addFields({name:'Deine Discord ID: ', value: message.author.id})
                    message.channel.send(embed4)
                   }
                   await message
                   eins(message.content)                  
                   await message
                   if(message.author.bot){
                    return
                }/*
                   zwei(message.content)    
                   if(message.author.bot){
                    return
                }           
                await message
                   drei(message.content)
                   */
                  file.verification_1().execute(message)
                })
            collector.on('end', collected =>{
                console.log('Collected '+collected.size)
            })
        }
        
        else{
            message.channel.send('Dieser Command darf nur in einer DM mit dem Bot verwendet werden!')
        }
        
        
    }
    
    
    
        )}}
