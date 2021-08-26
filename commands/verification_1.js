//für die embed nachrichten und den message collector
const Discord = require('discord.js')

//für mysql datenbank abfragen
let mysql = require('mysql');
module.exports = {
    name: 'verification_1',
    description: 'tba',
    execute(message, args) {

        //initialisiert die embed nachrichten
        let embed = new Discord.MessageEmbed()
        let embed2 = new Discord.MessageEmbed()
        let embed3 = new Discord.MessageEmbed()
        let embed4 = new Discord.MessageEmbed()

        //constructor für alle sql abfragen etc.
        var sql = mysql.createConnection({
            host: "localhost",
            user: "rcon",
            password: "Smaug-1RCON",
            database: "rcon"
        });

        //setzt für die embed nachrichten viel fest
        embed.setColor('#000000')
        embed.setTimestamp()
        embed.setTitle('Verifizierung')
        embed.setDescription('Willkommen zum Verifizierungsprozess des Holypenguin Networks!')
        embed.addFields({name: 'Anleitung:',value: 'Bitte habe in den nächsten schritten dein Token und deine GameID parat'})
        embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
        embed.setURL('https://www.holypenguin.de')
        embed.setFooter('Schritt 0 von ')

        embed2.setTitle('Schritt 1')
        embed2.setDescription('Bitte schicke hier in diesen Channel dein Token')
        embed2.setColor('#000000')
        embed2.setTimestamp()
        embed2.setURL('https://www.holypenguin.de')
        embed2.setFooter('Schritt 1 von 3')

        embed3.setTitle('Schritt 2')
        embed3.setDescription('Bitte gib hier deine GameID an')
        embed3.setURL('https://www.holypenguin.de')
        embed3.setColor('#000000')
        embed3.setTimestamp()
        embed3.setFooter('Schritt 2 von 3')

        embed4.setTitle('Bestätigung')
        embed4.setDescription('Der Folgende Gameserver wird hiermit mit deinem Discord Konto verbunden:')
        embed4.setColor('#000000')
        embed4.setTimestamp()
        embed4.setFooter('Schritt 3 von 3')
        embed4.setURL('https://www.holypenguin.de')

        //test variable die für verschiedene dinge benutzt wird
        let test1 = 1

        //delay funktion
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        //filter für den message collector
        let filter = m => m.author.id === message.author.id

        //erstellt den collector
        const collector = message.channel.createMessageCollector(filter, {time: 60000})

        //array, das zum wechseln zwischen den verschiedenen embed nachrichten benutzt wird
        let array = []

        //verbindet sich mit dem array
        sql.connect(async function (err) {
            if (err) {
                throw err
                return
            }

            //sobald zur sql database verbunden wurde wird diese nachricht gesendet (mehr für debug als für iwas anderes)
            console.log('Connected to MYSQLDATABASE')

            //die variablen die am ende in die datenbank geschrieben werden
            let id
            let gmID
            let token

            //wenn der channel typ eine dm ist wird alles ausgeführt, sonst nichts (geheimhaltungs gründe)
            if(message.channel.type === 'dm'){

                //sendet die ersten zwei embed nachrichten
                message.channel.send(embed)
                message.channel.send(embed2)

                //sobald der collector etwas sammelt wird das hier ausgeführt
                collector.on('collect', async message => {

                    //zweite abfrage ob der channel type = dm ist? FIXME
                    if (message.channel.type === 'dm') {

                        //sobald die länge des arrays = 0 ist wird das hier ausgeführt
                        if (array.length === 0) {

                            // der error code wird gleich 0 gesetzt
                            let error_code = 0

                            //token ist die eingabe von außen
                            token = message.content

                            //hier wird überprüft welche id zum token passt
                            sql.query('SELECT ID FROM Users WHERE usrGetKey = "' + message.content + '"', async function (err, result, field) {

                                //sobald ein error geworfen wird wird der fehler auf der konsole ausgegeben und das programm kehrt zurück zum alten zustand, nichts danach wird ausgeführt
                                if (err) {
                                    console.log(err)
                                    return
                                }

                                //die variable row wird hier definiert um danach aus dem result die id herauszulesen
                                let row
                                Object.keys(result).forEach(function (key) {
                                    row = result[key]
                                })

                                //schreibt erst in die globale variable id wenn es bestätigt ist, das der error code richtig ist
                                if (result.length !== 0) {
                                    id = row.ID
                                    error_code = 0
                                }

                                //sonst wird ein fehler als nachricht im discord ausgegeben
                                else {
                                    message.channel.send('Da ist wohl etwas schiefgelaufen :,( .... bitte versuche das Token erneut einzugeben!')
                                    error_code = 1
                                }
                            })
                            await sleep(1000)
                            if (error_code.toString() === '0') {

                                //sendet die dritte embed nachricht
                                message.channel.send(embed3)

                                //fügt dem array etwas hinzu damit bei der nächsten nachricht der nächste abschnitt ausgeführt werden kann
                                array.push('1')
                            }

                            //sonst aufhören
                            else {
                                return
                            }
                        }
                        else if (array.length === 1) {

                            //initialisiert error_code
                            let error_code1 = 0;

                            //initilisiert weitere variablen die wichtig für den weiteren verlauf sind
                            let variable
                            let test = 0

                            //fragt die ID ab die wir vorher herausgelesen haben
                            sql.query('SELECT * FROM User2Games WHERE usrID = "' + id + '" AND ID ="'+message.content+'"', async function (err, result) {

                                //error handling
                                if (err) {
                                    console.log(err)
                                    error_code1 = 1
                                    return
                                }
                                if(result.length >= 1){
                                    //wieder row um sachen aus dem result herauszulesen
                                    let row
                                    Object.keys(result).forEach(function (key) {
                                        row = result[key]
                                    })
                                    test = 1

                                    //die variable wird mit row.ID gefüllt um weiter unten verglichen zu werden
                                    variable = row.ID
                                    await sleep(500)
                                    console.log(variable)
                                }
                                else if(result.length === 0){
                                    message.channel.send('Da hat etwas nicht ganz geklappt, bitte nochmal versuchen!')
                                }
                            })

                            //wartet kurz bis die variablen alle gefüllt sind
                            await sleep(500);
                            if (test === 0) {
                                error_code1 = 1
                                console.log('Test ist gleich 0')
                            }
                            else {

                                //fehler fals die variable nicht gleich dem ergebnis aus der sql abfrage ist
                                if (variable !== parseInt(message.content)) {

                                    //falls ein fehler auftritt wird hier eine nachricht ausgegeben damit der nutzer weiß was passiert ist
                                    error_code1 = 1
                                    message.channel.send('Da hat etwas nicht funktioniert, bitte nochmal versuchen')
                                }
                                else {
                                    error_code1 = 0

                                    //hier werden alle variablen als zusammenfassung nocheinmal innerhalb einer embed nachricht ausgegeben
                                    embed4.addFields({name: 'Dein Token: ', value: token})
                                    embed4.addFields({name: 'Deine Server ID', value: message.content})
                                    embed4.addFields({name: 'Deine Discord ID: ', value: message.author.id})

                                    //sendet die embed nachricht und auch eine nachricht zum bestätigen oder ablehnen
                                    message.channel.send(embed4)
                                    message.channel.send('WENN DU DAMIT EINVERSTADEN BIST SCHREIBE BITTE 1 IN DIESEN CHAT, WENN NICHT SCHREIB 2')

                                    //fügt dem array noch etwas hinzu
                                    array.push('3')
                                    gmID = message.content
                                }
                            }

                            //falls ein fehler autritt wird dies hier ausgeführt
                            if (error_code1 === 0) {
                            }
                            else {
                                message.channel.send('Da hat etwas nicht funktioniert, bitte nochmal versuchen')
                            }
                        }

                        //letztes array zeug
                        else if (array.length === 2) {

                            //wenn der nutzer zustimmt wird das hier ausgeführt
                            if (message.content === '1') {

                                //vergleich wird initialisiert
                                let vergleich = 0

                                //zum testen ob der nutzer diesen server schon verbunden hat
                                sql.query('SELECT COUNT(*) AS number FROM DcUser WHERE usrKey = "'+token+'"  AND usr2gmID = "'+gmID+'"  AND dcID = "'+message.author.id+'"', async function (err, result, fields) {
                                    if(err){
                                        console.log(err)
                                        return
                                    }

                                    //row wiedermal
                                    let row
                                    Object.keys(result).forEach(function (key) {
                                        row = result[key]
                                    })

                                    //sobald die nummer nicht gleich 0 ist (zeigt an das der nutzer diesen server schon verbunden hat)
                                    if (row.number.toString() !== '0') {
                                        vergleich = 1
                                    }

                                    //sobald sie gleich null ist (noch nicht verbunden)
                                    else{
                                        vergleich = 0
                                    }

                                    //wartet nocheinmal kurz
                                    await sleep(100)
                                })

                                //wartet nocheinmal kurz
                                await sleep(1000)
                                if (vergleich === 0) {

                                    //embed nachricht
                                    let embed5 = new Discord.MessageEmbed()
                                    embed5.setTitle('Abgeschlossen!')
                                    embed5.setURL('https://www.holypenguin.de')
                                    embed5.setTimestamp()
                                    embed5.setFooter('Abgeschlossen!')
                                    embed5.setDescription('Du hast jetzt zugriff auf alle deine Verfügbaren Server Commands! Danke das du Holypenguin benutzt')
                                    embed5.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')

                                    //sendet die embed nachricth
                                    message.channel.send(embed5)

                                    //fügt nun einen neuen eintrag in der datenbank hinzu
                                    sql.query('INSERT INTO DcUser (usr2gmID,usrKey,dcID) VALUES ("' + gmID + '","' + token + '","' + message.author.id + '")', function (err, result) {

                                        //error handling
                                        if (err) {
                                            console.log(err)
                                            return
                                        }
                                        test1 = 0
                                    })
                                    await sleep(500)
                                }

                                //falls der nutzer den server bereits verbunden hat
                                else if(vergleich !== 0){
                                    message.channel.send('Dein Konto ist bereits mit diesem Game-Server verbunden!')
                                    test1 = 0
                                    await sleep(500)
                                }
                            }
                        }

                        //falls der nutzer zwei in den chat schreibt
                        else {
                            message.channel.send('Abbruch!')
                            array.push('4')
                            test1 = 0
                        }
                    }

                    //beendet die sql connection
                    else if (array.length === 3) {
                        sql.end()
                        test1 = 0
                    }
                })

                //sobald der collector endet
                collector.on('end', collected => {
                    //sql funtion wird beendet
                    sql.end()

                    //falls der nutzer zu lange braucht
                    if(test1 === 1){
                        message.channel.send('Du hast zu lange gebraucht!')
                    }

                    //sonst wird nichst in den chat geschrieben
                    else{
                        return
                    }
                })
            }

            //falls der channel type nicht gleich dm ist
            else if(message.channel.type !=='dm'){
                message.channel.send('Schreib den Bot bitte mit diesem Command direkt an')
                sql.end()
            }
        })
    }
}