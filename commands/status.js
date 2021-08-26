//für die funktion getlastline wird hier alles wichtige gesetzt
const getLastLine = require('./fileTools.js').getLastLine
const fileName = '/var/www/rcon/dc_bot/status/webseite.status'
const minLineLength = 1
let ip = '192.168.178.205'
let port = '443'
let child_process = require('child_process')

//für die embed nachricht
const Discord = require('discord.js')

//startet die embed nachricht
let embed = new Discord.MessageEmbed()

//um für die slash commands zu exporten wird hier ein funktion gemacht die später gecallt wird
async function fillembed(){

    //setzt die variable source auf main.js fest, um auf exportierte variablen etc aus main zuzugreifen    
    let source = require('../main.js')
    function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
    }

    //mapt den port 443 um zu checken ob die website on ist
    let status = child_process.execSync('nmap -p'+port+' '+ip+'| grep '+port+' | cut -d "" -f 2', async (errr, stdout, stderr)=>{
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

    //um uptime anzuzeigen im command
    let uptime = child_process.execSync('uptime -p', async (error, stdout, stderr)=>{
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
    //exportiert die variable uptime für die beschreibung später
    uptime = stdout
    console.log(status.toString())
    await sleep(500)
})
    console.log(status)

    //wartet kurz damit die variable status gefüllt ist
    await sleep(500)

    //stellt die embed nachricht richtig ein
    embed.setColor('#000000')
    embed.setTimestamp
    embed.setTitle('Status der Webseite')
    embed.setURL('https://www.holypenguin.de')
    embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')

    //je nachdem ob der port offen ist oder nicht wird die beschreibung gesetzt
    if(status.toString().includes('open')){
        embed.setDescription('Status: Online :green_circle:\n Uptime: '+uptime)
    }
    else{
        embed.setDescription('Status: Offline :red_circle:')    
    }

    //für den footer countdown bis der server herunterfährt
    const shutdown = new Date('01/01/1971 23:59:00').getHours()
    const shutdown2 = new Date('01/01/1971 23:59:00').getMinutes()
    const shutdown3 = new Date('01/01/1971 23:58:59').getSeconds()
    var d = new Date().getHours();
    var d2 = new Date().getMinutes();
    var d3 = new Date().getSeconds();
    f = shutdown - d
    f1 = shutdown2 - d2
    f2 = shutdown3 - d3

    let time = f
    let time1 = f1
    let time2 = f2

    //setzt footer
    embed.setFooter('Shutdown in: '+time+'Stunden '+ time1+'Minuten '+time2+'Sekunden')
}
module.exports = {
    name: 'status',
    description: 'displays status',
    async execute(message, args){
    
    //sendet die nachricht
    message.channel.send(embed)
}}

//um embed aufzubauen
fillembed()

//exportiert die embed nachricht für den slash command
module.exports.embed = embed