const { time } = require('console');
//setzt die constante discord für eigentlich alles in diesem file
const Discord = require('discord.js');
//die clientID des bots
const clientID = '';
//die scopes mit denen sich der bot verbindet
const scopes = ['rpc', 'rpc.api', 'message.read'];
//der prefix mit dem jeder command beginnt
const prefix = '-';
//erstellt einen neuen discord client (konstruktor)
const client = new Discord.Client();
//konstante fs wird hier festgelegt für die command files weiter unten
const fs = require('fs');


//für mysql
const mysql = require('mysql');
var sql = mysql.createPool({
    host: "192.168.178.205",
    user: "rcon",
    password: "Smaug-1RCON",
    database: "rcon"
});

//erstellt eine neue command file collection
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//für weiter unten
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
//delay funktion
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
const getApp = (guildId) =>{
    const app = client.api.applications(client.user.id)
    if(guildId){
        app.guilds(guildId)
    }
    return app
}
let f, f1, f2
//sobald der client ready ist
client.once('ready', ()=>{
    //schreibt auf der konsole ready
    console.log('Ready!')
    //Für den Status des Bots, der ein countdown ist
    const shutdown = new Date('01/01/1971 23:59:00').getHours()
    const shutdown2 = new Date('01/01/1971 23:59:00').getMinutes()
    const shutdown3 = new Date('01/01/1971 23:58:59').getSeconds()

    //setzt einen intervall, der alle 5 sekunden den status des bots updatet
    setInterval(() => {
        //dates damit die stunden etc berechnet werden könne bis der server herunterfährt
        var d = new Date().getHours();
        var d2 = new Date().getMinutes();
        var d3 = new Date().getSeconds();
        f = shutdown - d
        f1 = shutdown2 - d2
        f2 = shutdown3 - d3
        //setzt die aktivität des bots
        client.user.setActivity('Der Server fährt in: '+ f.toString()+'H '+f1.toString()+'M '+f2.toString()+'s Herunter')
        //exportiert die zeiten damit andere commands sie benutzen können
        module.exports.time = f
        module.exports.time1 = f1
        module.exports.time2 = f2
    },5000);
})

async function test (){

    await sleep(500)
    return embed
}

client.on('ready', async ()=>{
    const guildId = '502935781749293067'
    const slashcommands = await getApp(guildId).commands.get()

    console.log(slashcommands)
    await getApp(guildId).commands.post({
        data:{
            name:'ping',
            description:'First Command'
        }
    })

    await getApp(guildId).commands.post({
        data: {
            name: 'embed',
            description: 'Embed nachricht',
            options:[
                {
                    name: 'name',
                    description: 'Your Name',
                    required: true,
                    type: 3 //= string
                },
                {
                    name:'age',
                    description: 'Dein Alter',
                    required: false,
                    type:4//integer
                }
            ]
        }
    })

    await getApp().commands.post({
        data:{
            name: 'help',
            description: 'Hilfe Command für den Robo penguin',
            options:[
                {
                    name:'parameter',
                    description:'Für Hilfe zu deinen Spielen: help_game, Für alles andere: help_default',
                    required: true,
                    type:3,
                    choices:[
                        {
                            name:'help',
                            description:'Zeigt dir die Allgemeine Hilfe an',
                            type:3,
                            value:'help_default'
                        },
                        {
                            name:'help_game',
                            description:'Zeigt dir die Hilfe an zu allen Spiel-Spezifischen Commands',
                            type:3,
                            value:'help_game'
                        }
                    ]
                }
            ]
        }
    })

    await getApp().commands.post({
        data:{
            name:'status_website',
            description: 'Lass dir den Status der Holypenguin Seite anzeigen'
        }
    })

    await getApp().commands.post({
        data:{
            name:'status',
            description: 'Gibt den Status eines von dir angegebenen Spiels zurück',
            options:[
                {
                    name:'server_id',
                    description:'Gib hier deine Game ID von der Einstellungsseite auf holypenguin.de an',
                    required:true,
                    type:4
                }
            ]
        }
    })
    client.ws.on('INTERACTION_CREATE',async (interaction)=>{
        const reply = async (interaction, response) =>{
            let data = {
                content:response,
            }
            //check for embed
            if(typeof response === 'object') {
                data = await createAPIMessage(interaction, response)
            }
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data:{
                    type:4,
                    data
                },

            })}
        const sendtwo= async (interaction, response)=>{
            let data = {
                content: response
            }
            //check for embed
            if(typeof response === 'object') {
                data = await createAPIMessage(interaction, response)
            }
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data:{
                    type:5,
                    data
                }
            })
        }
        const createAPIMessage = async(interaction, content)=>{
            const{ data, files } = await Discord.APIMessage.create(
                client.channels.resolve(interaction.channel_id),
                content
            )
                .resolveData()
                .resolveFiles()

            return{...data, files }
        }
        //gibt die id des nuters zurück der den slash command gesendet hat
        console.log(interaction.member.user.id)
        const { name , options } = interaction.data
        const command = name.toLowerCase()
        const arguments = {}
        if(options){
            for(const option of options){
                const { name, value } = option
                arguments[name] = value
            }
        }
        console.log(arguments)

        if(command === 'ping'){
            reply(interaction, 'pong!')
        }
        else if (command === 'embed'){
            const embed = new Discord.MessageEmbed()
                .setTitle('Beispiel')
                .setDescription('Beispiel')
            for(const argument in arguments){
                const value = arguments[argument]
                embed.addField(argument, value)
            }
            reply(interaction, embed)
        }

        else if (command === 'help'){
            if(arguments.parameter === 'help_default'){
                const source = require('/var/www/rcon/dc_bot/commands/help.js')
                let embed = source.embed
                reply(interaction, embed)
            }
            else if(arguments.parameter  === 'help_game'){
                const source = require('/var/www/rcon/dc_bot/commands/help_game.js')
                let embed = source.embed
                reply(interaction, embed)
            }
            else{
                reply(interaction, 'Das ist kein registriertes Parameter')
            }
        }

        else if (command === 'status_website'){
            const source = require('/var/www/rcon/dc_bot/commands/status.js')
            let embed = source.embed
            reply(interaction, embed)
        }
        else if (command === 'status'){
            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }

            async function yee(){

                console.log('Connected to DB!')
                let id = interaction.member.user.id
                console.log(id)
                let serverid = options[0].value
                console.log(serverid)

                sql.getConnection(async function(err){
                    if(err){
                        console.log(err)
                        return
                    }

                    let kontrolle
                    sql.query('SELECT * FROM DcUser WHERE dcID ="'+id+'" AND usr2gmID ="'+serverid+'"', async function (err, result, fields){
                        if(err){
                            console.log(err)
                            return
                        }
                        console.log('RESULT = '+result.length)
                        if(result.length >= 1){
                            kontrolle = 1
                        }
                        else{
                            kontrolle = 0
                        }
                    })
                    await sleep(200)
                    console.log('Kontrolle: ' +kontrolle)
                    if(kontrolle === 0){
                        reply(interaction, 'Dieser Discord Account ist nicht mit dem Angegebenen Server verbunden!')

                    }
                    else{

                        let embed = new Discord.MessageEmbed()
                        embed.setTitle('Satus des Gameservers: '+serverid)
                        console.log('SERVERID: '+serverid)
                        sql.query('SELECT * FROM User2Games WHERE ID ="'+serverid+'"',async function(err, result, fields){

                            //für die ergebnisse
                            let row
                            Object.keys(result).forEach(function (key) {
                                row = result[key]
                            })
                            let port = row.gmPort
                            console.log(port)
                            let child_process = require('child_process')
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
                            })
                            console.log('Status: '+status.toString())
                            if(status.toString().includes('open')){
                                embed.setDescription('Dein Server ist: an :green_circle:')
                                embed.setTimestamp()
                                embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
                                embed.setURL('https://www.holypenguin.de')
                                reply(interaction, embed)

                            }
                            else if(status.toString().includes('filtered')){
                                embed.setDescription('Dein Server wurde nicht gefunden! Wenn du dir sicher bist das du alles richtig gemacht hast, dann gib den Command nochmal ein, sonst Kontaktiere entweder @Svenum oder @Sir Berg für Hilfe!')
                                embed.setTimestamp()
                                embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
                                embed.setURL('https://www.holypenguin.de')
                                reply(interaction, embed)

                            }
                            else{
                                embed.setDescription('Dein Server ist: aus :red_circle:')
                                embed.setTimestamp()
                                embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
                                embed.setURL('https://www.holypenguin.de')
                                reply(interaction, embed)
                                
                            }
                        })
                    }
                })
            }
            await yee()
        }
    })
})
//sobald eine nachricht gesendet wird
client.on('message', async message =>{
    //die message wird überprüft und der prefix entfernt
    const args = message.content.slice(prefix.length).split(/ +/)
    //der input wird in die variable command geschrieben, die verglichen werden kann
    const command = args.shift().toLowerCase();
    //wenn der content der message nicht mit dem prefix, oder wenn der autor der nachricht ein bot ist dann wird die nachricht ignoriert
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    //Hier werden die commands aufgerufen
    if (command === 'help'){
        client.commands.get('help').execute(message,args)}
    else if (command ==='status_website'){
        client.commands.get('status').execute(message,args)}
    else if (command === 'verification'){
        client.commands.get('verification_1').execute(message,args)}
    else if (command === 'status_game'){
        client.commands.get('status_game').execute(message,args)}
    else if (command === 'list'){
        client.commands.get('list').execute(message,args)}
    else if (command === 'abmelden'){
        client.commands.get('abmelden').execute(message,args)}
    else if (command === 'help_game'){
        client.commands.get('help_game').execute(message,args)}
})

//logt den Client ein
client.login('')
