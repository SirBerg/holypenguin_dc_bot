const Discord = require('discord.js');
let embed = new Discord.MessageEmbed()
let source = require('../main.js')

function fillembed(){
    const shutdown = new Date('01/01/1971 23:59:00').getHours()
    const shutdown2 = new Date('01/01/1971 23:59:00').getMinutes()
    const shutdown3 = new Date('01/01/1971 23:58:59').getSeconds()
    var d = new Date().getHours();
    var d2 = new Date().getMinutes();
    var d3 = new Date().getSeconds();
    f = shutdown - d
    f1 = shutdown2 - d2
    f2 = shutdown3 - d3

    let time1 = f
    let time2 = f1
    let time3 = f2
    embed.setColor('#000000')
    embed.setTimestamp
    embed.setTitle('Dokumentation / Hilfe')
    embed.setDescription('Hier findest du die Dokumentation und die Hilfe zu diesem Bot und seinen Commands')
    embed.setThumbnail('https://media.discordapp.net/attachments/502935782173179935/847371123518865478/Logo_1.png')
    embed.addFields({name:'Commands', value:['-help\n', '-status_website\n', '-help_game'], inline:true})
    embed.addFields({name:'Beschreibung', value: ['Hiermit lässt du dir diese Nachricht anzeigen\n', 'Hiermit lässt du dir den Status der Website angeben', 'Hiermit lässt du dir Spezifische Commands zu deinem Gameserver anzeigen'], inline:true})
    embed.setURL('https://www.holypenguin.de')
    embed.setFooter('Shutdown in: '+time1+' Stunden '+ time2+' Minuten '+time3+' Sekunden')
}
module.exports = {
    name:'help',
    description:'help-command',
    execute(message,args){
    message.channel.send(embed)
    }
}
fillembed()
module.exports.embed = embed