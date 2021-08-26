//Konstante für embed nachrichten
const discord = require('discord.js')

//macht es diesen command sichtbar für das main file
module.exports = {
    name: 'status_game',
    description : 'Yeetus',
    execute(message,args){


        //warten funktion
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        //Für Mysql befehle
        const mysql = require('mysql')
        var sql = mysql.createConnection({
            host: "localhost",
            user: "rcon",
            password: "Smaug-1RCON",
            database: "rcon"
        });

        //später für das feststellen ob es ein timeout ist oder nicht
        let test = 0

        //aus list.js für das auflisten aller spiele eines nutzers bitte list.js anschauen für erklärungen was was macht
        function list (id){
            const discord = require('discord.js')
            const mysql = require('mysql')
            var sql = mysql.createConnection({
                host: "localhost",
                user: "rcon",
                password: "Smaug-1RCON",
                database: "rcon"
            });
            sql.connect(async function (err){
                if(err){
                    console.error(err)
                    return
                }
                function sleep(ms) {
                    return new Promise((resolve) => {
                        setTimeout(resolve, ms);
                    });
                }

                let embed = new discord.MessageEmbed();
                embed.setTitle('Deine Spiele:')
                embed.setDescription('Hier siehst du alle deine Spiele und ihre IDs')
                sql.query('SELECT * FROM DcUser LEFT JOIN User2Games ON DcUser.usr2gmID = User2Games.ID LEFT JOIN Games ON User2Games.gmID = Games.ID WHERE dcID= "'+id+'"', async function (err, result,fields){
                    let row
                    let typearr = []
                    let versionarr = []
                    let idarr = []
                    let namearr = []
                    //await sleep(500)
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
                    embed.addFields({name: 'ID', value: idarr, inline: true})
                    embed.addFields({name: 'Name', value: namearr, inline: true})
                    embed.addFields({name: 'Type', value: typearr, inline: true})
                    embed.addFields({name: 'Version', value: versionarr, inline: true})

                    await sleep(500)
                    message.channel.send(embed)
                    message.channel.send("Bitte die ID des Servers angeben von der der Status angezeigt werden soll")
                })
            })
        }

        //connected zur sql datenbank
        sql.connect(
            async function(err){

            if(err){
                console.error(err)
                return
            }

            //variablen für den spätern aublauf des programms
            let kontrolle = 0
            let array = []
            let getkey
            let usrid

            //für den discord message collector
            let filter = m => m.author.id === message.author.id

            //sendet eine sql query
            sql.query('SELECT * FROM DcUser WHERE dcID ="' + message.author.id + '"', async function (err, result, fields) {
                
                //err handling
                if (err) {
                    console.error(err)
                    return
                }

                //um später alles aus einem sql result zu lesen können
                let row
                Object.keys(result).forEach(function (key) {
                    row = result[key]
                })
                //wartet, damit row immer gefüllt ist
                await sleep(500)
                //sobald mehr als ein eintrag da ist müssen die spiele aufgelistet werden
                if (parseInt(result.length) >= 1) {
                    list(message.author.id)
                    kontrolle = 1
                    await sleep(1000)
                    //für das auslesen einer usrid
                    getkey = row.usrKey
                    function queryusrid(){

                        //sendet eine sql query
                        sql.query('SELECT ID FROM Users WHERE usrGetKey ="'+getkey+'"', function (err, result, fields){
                            //err handling
                            if (err) {
                                console.error(err)
                                return
                            }
    
                            //um später alles auslesen zu können
                            let row
                            Object.keys(result).forEach(function (key) {
                                row = result[key]
                            })
                            usrid = row.ID
    
                        })
                    }
                    queryusrid()
                }
                else if (parseInt(result.length) == 1){
                    kontrolle = 1
                    await sleep(1000)
                    getkey = row.usrKey
                    function queryusrid(){

                        //sendet eine sql query
                        sql.query('SELECT ID FROM Users WHERE usrGetKey ="'+getkey+'"', function (err, result, fields){
    
                            //err handling
                            if (err) {
                                console.error(err)
                                return
                            }
    
                            //um später alles auslesen zu können
                            let row
                            Object.keys(result).forEach(function (key) {
                                row = result[key]
                            })
                            usrid = row.ID
    
                        })
                    }
                    queryusrid()
                }
                else if (parseInt(result.length) === 0){
                    kontrolle = 0
                    message.channel.send('Du hast anscheinend keine Spiele mit deinem Discord konto verknüpft, bitte schaue in #info nach der Anleitung oder auf der Einstellungseite auf https://www.holypenguin.de')
                }

            })

            //message collector constructor
            const collector = message.channel.createMessageCollector(filter, {time: 60000})

            //sobald eine nachricht gesendet wird
            
            collector.on('collect', async message =>{
                if(kontrolle == 1){
                    //array, damit nicht ein schritt zweimal ausgeführt wird sobald es einmal ausgeführt wurde
                    if(array.length === 0){
                        sql.query('SELECT * FROM User2Games WHERE ID = "'+message.content+'" AND usrID = "'+usrid+'"', async function (err, result, fields){
                            if(err){
                                console.log(err)
                                return
                            }

                            //um die results herauszulesen
                            let row
                            Object.keys(result).forEach(function (key) {
                                row = result[key]
                            })

                            //wenn wir kein ergebniss bekommen, hat der nutzer kein spiel oder die id ist falsch oder die id ist nicht mit seinem profil verbunden
                            if(result.length === 0){
                                message.channel.send('Das ist nicht ganz richtig gewesen, bitte nocheinmal versuchen!')
                            }

                            //sonst können wir ein nmap ausführen auf den port in der datenbank
                            else{

                                //später um den port zu nmapen
                                let port

                                //port abfragen
                                sql.query('SELECT gmPort FROM User2Games WHERE ID = "'+message.content+'"', async function(err, result, fields){

                                    //err handling
                                    if(err){
                                        console.log(err)
                                        return
                                    }

                                    //für die ergebnisse
                                    let row
                                    Object.keys(result).forEach(function (key) {
                                        row = result[key]
                                    })

                                    //setzt den port gleich dem ergebniss port
                                    port = row.gmPort
                                })

                                //startet die letzte embed nachricht
                                let embed1 = new discord.MessageEmbed();

                                //fixt das problem das der port undefined war
                                await sleep(200)

                                //required das module child_process
                                let child_process = require('child_process')
                                console.log(port)
                                //führt nmap als child process aus
                                let status = child_process.execSync('nmap -Pn -p '+port+' 192.168.178.221 | grep '+port+' | cut -d" " -f 2' , async (error, stdout, stderr) => {
                                    function sleep(ms) {
                                        return new Promise((resolve) => {
                                            setTimeout(resolve, ms);
                                        });
                                    }

                                    //error handling
                                    if (error){
                                        console.log('error: '+ error.message)
                                        message.channel.send('Es ist ein Fehler Aufgetreten: '+ error.message)
                                        return
                                    }

                                    //error handling
                                    if(stderr){
                                        console.log('Stderr: '+ error.message)
                                        message.channel.send('Es ist ein Stderror Aufgetreten: '+ error.message)
                                        return
                                    }

                                    //exportiert die variable status für später
                                    status = stdout
                                    await sleep(500)
                                })
                                

                                //für die embed nachricht
                                let msg
                                console.log(status.toString())
                                //status.toString() weil sonst ein buffer zurückgegeben wird
                                if (status.toString().includes('open')){
                                    msg ='Dein Server ist an! :green_circle:'
                                }
                                else if (status.toString().includes('filtered')){
                                    msg ='Dein Server wurde nicht gefunden! Wenn du dir sicher bist das du alles richtig gemacht hast, dann gib den Command nochmal ein, sonst Kontaktiere entweder @Svenum oder @Sir Berg für Hilfe!'
                                }
                                else{
                                    msg ='Dein Server ist aus! :red_circle:'
                                }

                                //damit die msg var gefüllt ist
                                await sleep(500)

                                //richtet die embed nachricht ein
                                embed1.setTitle('Status von Gameserver: '+message.content)
                                embed1.setDescription('Hier ist der Status deines Gameservers:')
                                embed1.addFields({name:'Status: ', value:msg})
                                embed1.setTimestamp()
                                embed1.setURL('https://www.holypenguin.de')
                                embed1.setThumbnail('https://images-ext-2.discordapp.net/external/p9TH-xuNL13NF8QppRA20rA9LO8Ys5UBsCQwwRcnzQs/https/media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
                                sql.end()
                                //sendet embed1
                                message.channel.send(embed1)

                                //pusht das array nocheinmal damit nicht nocheinmal der collector getriggered wird
                                array.push('1')

                                //für collector.on('end')
                                test === 1
                            }
                        })
                    }

                    //handling wenn das array gleich 1 ist
                    else if (array.length === 1){

                        //sobald der collector endet
                        collector.on('end', async collected =>{
                            console.log('End')

                            //der collector endet immer nach ablauf der 60 sekunden, aber wenn der command durchgelaufen ist wird keine nachricht gesendet wegen test
                            if(test === 1){
                                return
                            }
                            else{
                                message.channel.send('Du hast zu lange gebraucht')
                            }
                        })
                    }

                    //keine ahnung ob das hier sein muss
                    else{
                        return
                    }
                    
                }     
                else if(kontrolle == 0){
                    return
                }
            })
        })
    }
}