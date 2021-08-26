const Discord = require('discord.js')
module.exports = {
    'name': 'abmelden',
    'description': 'abmelden von einem server',

    //führt die nachricht aus
    execute(message, args){
        let author = message.author.id
        let id
        let getkey
        const mysql = require('mysql')
        var sql = mysql.createConnection({
            host: "localhost",
            user: "rcon",
            password: "Smaug-1RCON",
            database: "rcon"
        });
        //filter für den message collector
        let filter = m => m.author.id === message.author.id

        //delay funktion
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        //erstellt den collector
        const collector = message.channel.createMessageCollector(filter, {time: 60000})

        //kontrolle um zu schauen ob ein nutzer überhaupt spiele hat
        let kontrolle

        //für das auflisten der spiele eines nutzers
        function list (id){

            //required das mysql module für die sql-abfragen in diesem Command
            const mysql = require('mysql')

            //für discord sachen
            const discord = require('discord.js')
            //sql constructor, damit sql abfragen möglich sind
            var sql = mysql.createConnection({
                host: "localhost",
                user: "rcon",
                password: "Smaug-1RCON",
                database: "rcon"
            });

            //baut die sql verbindung auf
            sql.connect(async function (err){
                if(err){
                    console.error(err)
                    return
                }

                //sleep funktion für das warten auf code
                function sleep(ms) {
                    return new Promise((resolve) => {
                        setTimeout(resolve, ms);
                    });
                }


                sql.query('SELECT * FROM DcUser WHERE dcID ="'+message.author.id+'"', function (err, result, fields){
                    if(err){
                        console.log(err)
                        return
                    }
                    if(result.length>=1){
                        kontrolle = 1
                    }
                    else if (result.length == 0){
                        kontrolle = 0
                    }
                })

                //um auf kontrolle zu warten
                await sleep(300)

                //um kontrolle zu vergleichen
                if(kontrolle == 1){

                    //startet die embed nachricht die am ende gesendet wird, und setzt titel und beschreibung
                    let embed= new discord.MessageEmbed();
                    embed.setTitle('Deine Spiele:')
                    embed.setDescription('Hier siehst du alle deine Spiele und ihre IDs')

                    //sendet eine sql abfrage an den server
                    sql.query('SELECT * FROM DcUser LEFT JOIN User2Games ON DcUser.usr2gmID = User2Games.ID LEFT JOIN Games ON User2Games.gmID = Games.ID WHERE dcID= "'+id+'"', async function (err, result,fields){

                        //setzt variablen für die embed.addfields funktionen weiter unten
                        let row
                        let typearr = []
                        let versionarr = []
                        let idarr = []
                        let namearr = []

                        //für jedes result wird hier diese funktion ausgeführt die alles in arrays schreibt für die embed nachricht
                        Object.keys(result).forEach(async function (key) {
                            row = result[key]

                            idarr.push(row.usr2gmID)
                            if (row.gmName == null){
                                namearr.push("-----")
                            } else {
                                namearr.push(row.gmName)
                            }

                            if (row.gmType == null){
                                typearr.push("-----")
                            } else {
                                typearr.push(row.gmType)
                            }

                            if (row.gmVersion == null){
                                versionarr.push("-----")
                            } else {
                                versionarr.push(row.gmVersion)
                            }

                        })

                        //setzt attribute der list embed nachricht
                        embed.setURL('https://www.holypenguin.de')
                        embed.setThumbnail('https://images-ext-2.discordapp.net/external/p9TH-xuNL13NF8QppRA20rA9LO8Ys5UBsCQwwRcnzQs/https/media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
                        embed.setTimestamp()

                        //hier werden die arrays in die felder der embed nachricht geschrieben
                        embed.addFields({name: 'ID', value: idarr, inline: true})
                        embed.addFields({name: 'Name', value: namearr, inline: true})
                        embed.addFields({name: 'Type', value: typearr, inline: true})
                        embed.addFields({name: 'Version', value: versionarr, inline: true})

                        //wartet kurz bis alles in der nachricht steht
                        await sleep(500)

                        //sendet die nachricht
                        message.channel.send(embed)
                    })}

                //um zu testen ob der nutzer überhaupt ein spiel hat
                else if (kontrolle == 0){
                    message.channel.send('Du hast anscheinend keine Spiele mit deinem Discord konto verknüpft, bitte schaue in #info nach der Anleitung oder auf der Einstellungseite auf https://www.holypenguin.de')
                }
            })
        }
        sql.connect(async function (err) {
            if (err) {
                throw err
                return
            }
            list(author)
            message.channel.send('Bitte die ID des Spiels angeben, die du von deinem Discord Account entfernen willst')
            let kontrolle2
            let kontrolle3 = 0
            let array = []
            collector.on('collect', async message =>{
                if(array.length === 0){
                    if(kontrolle == 0){
                        return
                    }
                    else{
                        sql.query('SELECT * FROM DcUser WHERE usr2gmID ="'+message.content+'"', async function(err, result, fields){
                            if(err){
                                console.log(err)
                                return
                            }
                            if (result.length >= 1){
                                kontrolle2 = 1
                            }
                            else{
                                kontrolle2 = 0
                                message.channel.send('Da ist wohl etwas schiefgelaufen, bitte überprüfe die ID und versuche es nocheinmal!')
                            }
                        })
                        await sleep(500)
                        if (kontrolle2 === 1){
                            sql.query('DELETE FROM DcUser WHERE usr2gmID ="'+message.content+'" AND dcID ="'+author+'"', async function(err, result, fields){
                                if(err){
                                    console.log(err)
                                    return
                                }
                                let embed = new Discord.MessageEmbed()
                                embed.setTitle('Abgemeldet!')
                                embed.setDescription('Du hast dich erfolgreich vom Gameserver: '+message.content+' abgemeldet. Danke das du Holypenguin  benutzt!')
                                embed.setTimestamp()
                                embed.setURL('https://www.holypenguin.de')
                                embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
                                if(result.length >= 1){
                                    message.channel.send('OK!')
                                    array.push('1')
                                }
                                else{
                                    message.channel.send(embed)
                                    kontrolle3 = 1
                                    array.push('1')
                                }
                            })
                        }
                        else{
                            return
                        }
                    }
                }
                else if (array.length === 1){
                    collector.on('end', collected => {
                        if (kontrolle3 === 1){
                            sql.end()
                            return
                        }
                        else{
                            message.channel.send('Der Heilige Pinguin wird ungeduldig! Sei das nächste mal schneller!')
                            sql.end()
                        }
                    })
                }
            })
            //ende von sql.connect
        })
    }
}