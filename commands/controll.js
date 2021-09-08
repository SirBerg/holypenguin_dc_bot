const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')
const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
const WebSocket = require('ws')
//sleep funktion
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//errors und states
const {node_js_emergency, filesystem_module_emergency, discord_js_emergency} = require("../helper/error.js")
const { discord_error, filesystem_module_error, general_error, sql_error } = require('../helper/error.js')
const {discord_warning, filesystem_module_warning, general_warning, sql_warning} = require('../helper/error.js')
const {general_notice, discord_notice, general_state_good} = require('../helper/states.js')
const {node_js_emergency_ohne, filesystem_module_emergency_ohne, discord_js_emergency_ohne} = require('../helper/error_ohne.js')
const {discord_error_ohne, filesystem_module_error_ohne, general_error_ohne, sql_error_ohne } = require('../helper/error_ohne.js')
const {discord_warning_ohne, general_warning_ohne, filesystem_module_warning_ohne, sql_warning_ohne } = require('../helper/error_ohne.js')
const {general_notice_ohne, discord_notice_ohne, sql_notice_ohne } = require('../helper/states_ohne.js')
const { get_current_time, get_current_time_friendly }= require('../helper/get_current_time.js');
const { get_current_time_ohne_blau } = require('../helper/get_current_time_ohne_blau.js');
const { sql_notice } = require('../helper/states.js');

//um den log pfad zu bekommen
const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")
var db = new JsonDB(new Config("D:/GitHub/holypenguin_dc_bot/config.json", true, false, '/'));
const path = db.getData('/path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('control_panel')
		.setDescription('Dein KontrollZentrum für deine Server'),
	async execute(interaction) {
		//um an das logfile anzuhängen
		async function append_log(value){
			fs.appendFile(path , value+'\n', (err, result)=>{
				if(err){
					console.log(filesystem_module_error+ general_error+'Konnte nicht ins logfile schreiben Grund:\n'+err)
				}
			})
		}
		console.log(get_current_time()+discord_notice+'Start ControllPanel.js')
		append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Start ControllPanel.js')

		let dc_user_id = interaction.user.id

		const mysql = require('mysql')

        let sql = mysql.createConnection({
            host: "localhost",
            user: "server",
            password: "RjdEDNwhM#w0Q5ziM!!Afp%PAd#dXi",
            database: "holypenguin"
        });

		sql.on('end', ()=>{
			console.log('SQL Connection beendet in Controll JS')
		})

		//holt die user2gm_id aus dc_user_id
		sql.query('SELECT * FROM Discord WHERE dc_Discord_ID="'+dc_user_id+'" AND dc_Block="0"', async (err, result)=>{
			if(err){
				console.log(get_current_time()+sql_error+general_warning+'SQL Error in Controll.js')
				console.log(err)
				append_log(get_current_time_ohne_blau()+sql_error_ohne+general_warning_ohne+'SQL Error in Controll.js')
			}


			//falls es null ist wird zurück geschickt das der nutzer erst ein spiel registrieren soll
			if(result.length === 0){
				const embed = new Discord.MessageEmbed()
				embed.setTitle('Registrieren')
				embed.setDescription('Es sieht so aus als ob du keine Spiele hättest, bitte registriere sie erst um diesen Command benutzen zu können! \n Falls du Probleme mit der Registrierung hast, kontaktiere bitte Svenum oder Sir Berg!')
				embed.setColor('#bb04db')
				embed.setURL('https://holypenguin.de')
				embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
				embed.setTimestamp()

				await interaction.reply({embeds: [embed]})
			}

			//falls es eins ist müssen wir keine weiter buttons hinzufügen und das spiel aus der datenbank holen
			
			else if (result.length === 1){
				usr2gm_ID = result[0].usr2gm_ID
				sql.query('SELECT * FROM User2Games WHERE usr2gm_ID="'+usr2gm_ID+'"', async(err, result)=>{
					if(err){
						console.log(get_current_time()+sql_error+general_warning+'SQL Error in Controll.js')
						console.log(err)
						append_log(get_current_time_ohne_blau()+sql_error_ohne+general_warning_ohne+'SQL Error in Controll.js')
					}
					
					//holt den Port für den Websocket raus
					const host = db.getData('/host')
					const connection = new WebSocket('ws://192.168.159.128:8080')//+result[0].usr2gm_Websocket_Port)
					
					connection.onopen = () => {
						//sobald die websocket verbindung geöffnet wird, wird hier geconsole logged
						console.log(get_current_time()+general_notice+'Websocket verbindung zu Port: '+result[0].usr2gm_Websocket_Port)
						append_log(get_current_time_ohne_blau()+general_notice_ohne+'Websocket verbindung zu Port: '+result[0].usr2gm_Websocket_Port)
					}
					
					connection.onerror = error => {
						console.log(error)
						//sobald ein error auftritt wird hier geconsole logged
						console.log(get_current_time()+general_warning+'Websocket Error: \n'+error)
						append_log(get_current_time_ohne_blau()+general_warning_ohne+'Websocket Error: \n'+error)
					}

					let gm_Name, gm_Type,gm_Version, name

					sql.query('SELECT * FROM Games WHERE gm_ID="'+result[0].gm_ID+'"', async (err, result)=>{
						if(err){
							console.log(get_current_time()+sql_error+general_warning+'SQL Error in Controll.js')
							console.log(err)
							append_log(get_current_time_ohne_blau()+sql_error_ohne+general_warning_ohne+'SQL Error in Controll.js')
						}
						gm_Name = result[0].gm_Name
						gm_Type = result[0].gm_Type
						gm_Version = result[0].gm_Version
					})
					await sleep(100)
					name = gm_Name+' '+gm_Type+' '+gm_Version
					let embed = new Discord.MessageEmbed()


					const button = new Discord.MessageActionRow().addComponents(
						new Discord.MessageButton().setCustomId('start').setLabel('Start').setStyle('PRIMARY'),
						new Discord.MessageButton().setCustomId('save').setLabel('Save').setStyle('PRIMARY'),
						new Discord.MessageButton().setCustomId('stop').setLabel('Stop').setStyle('PRIMARY'),
						new Discord.MessageButton().setCustomId('restart').setLabel('Restart').setStyle('PRIMARY')
					)
					
					//filter und collector für die updates der nachricht weiter unten
					const filter = i => i.user.id === dc_user_id;
					const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

					//sobald ein Knopf gedrückt wird, wird die Nachricht geupdatet
					let secure_string = "lSdxqpgg00s0kWqyP678iFx1IoMeFmY8"
					collector.on('collect', async i =>{
						const jwt = require('jsonwebtoken')
						if( i.customId === 'start'){
							embed.setTitle('Server wird gestartet: '+name)
							embed.setURL('https://holypenguin.de')
							embed.setColor('#bb04db')
							embed.setURL('https://holypenguin.de')
							embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
							embed.setTimestamp()
							embed.setDescription('Dein Server wird nun Gestartet, bitte warte kurz')
							
							//generates jwt string
							let token
							jwt.sign({"command":"start"}, secure_string, (err, jwt)=>{
								if(err){
									console.log(get_current_time()+general_error+discord_warning+'JWT Error in controlljs:\n'+err)
									append_log(get_current_time_ohne_blau()+general_error_ohne+discord_warning_ohne+'JWT Error in controlljs')
									append_log(err)
								}
								token = jwt
							})
							await sleep(100)
							connection.send(token)
							connection.send(JSON.stringify({"command": "start"}))


							connection.onmessage = message =>{
								console.log(message)
							}
							console.log(get_current_time()+general_notice+discord_notice+'JWT Token, zum starten eines Servers gesendet!')
							append_log(get_current_time_ohne_blau()+general_notice_ohne+discord_notice_ohne+'JWT Token, zum starten eines Servers gesendet!')
							await i.update({embeds: [embed]})
						}
						else if('save'){
							embed.setTitle('Server wird gesichert: '+name)
							embed.setURL('https://holypenguin.de')
							embed.setColor('#bb04db')
							embed.setURL('https://holypenguin.de')
							embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
							embed.setTimestamp()
							embed.setDescription('Dein Server wird nun Gesichert, bitte warte kurz')

							await i.update({embeds: [embed]})
						}
						else if('stop'){
							embed.setTitle('Server wird gestoppt: '+name)
							embed.setURL('https://holypenguin.de')
							embed.setColor('#bb04db')
							embed.setURL('https://holypenguin.de')
							embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
							embed.setTimestamp()
							embed.setDescription('Dein Server wird nun Gestoppt, bitte warte kurz')

							await i.update({embeds: [embed]})
						}
						else if ('restart'){
							embed.setTitle('Server wird neugestartet: '+name)
							embed.setURL('https://holypenguin.de')
							embed.setColor('#bb04db')
							embed.setURL('https://holypenguin.de')
							embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
							embed.setTimestamp()
							embed.setDescription('Dein Server wird nun neugestartet, bitte warte kurz')
							
							await i.update({embeds: [embed]})
						}
					})

					embed.setTitle('Controlls für: '+name)
					embed.setURL('https://holypenguin.de')
					embed.setColor('#bb04db')
					embed.setURL('https://holypenguin.de')
					embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
					embed.setTimestamp()
					embed.setDescription('Hier sind die Commands für GameServer: '+name)

					await interaction.reply({ephemeral: true, embeds: [embed], components: [button]})
				})
			} 

			//falls es mehr als eins ist müssen wir mehrere buttons anzeigen und die anderen spiele aus der datenbank holen
			else{

			}
		})
	},
};