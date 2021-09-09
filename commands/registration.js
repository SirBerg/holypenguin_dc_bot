const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')
const Discord = require('discord.js')

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
var db = new JsonDB(new Config("./config.json"), true, false, '/')
let path = db.getData('/path')

//eigentliche command logik
module.exports = {
	data: new SlashCommandBuilder()
		.setName('registration')
		.setDescription('Verbinde dich mit deinem Game Server!')
        .addStringOption(option =>
            option.setName('gameserver')
                .setDescription('Die ID deines GameServers')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('usertoken')
                .setDescription('Dein Usertoken von holypenguin.de')
                .setRequired(true)
        ),
	async execute(interaction) {
        //um an das logfile anzuhängen
        async function append_log(value){
            fs.appendFile(path , value+'\n', (err, result)=>{
                if(err){
                    console.log(filesystem_module_error+ general_error+'Konnte nicht ins logfile schreiben Grund:\n'+err)
                }
            })
        }
        console.log(get_current_time()+discord_notice+'CommandFile Start: registration')
        append_log(get_current_time_ohne_blau()+discord_notice_ohne+'CommandFile Start: registration')
        //zieht die Interaction Variablen raus
        let gameserver_id = interaction.options.getString("gameserver")
        let usertoken = interaction.options.getString("usertoken")
        let dc_user_id = interaction.user.id

        //erstellt den Mysql Pool
        const mysql = require('mysql')

        let sql = mysql.createConnection({
            host: "localhost",
            user: "server",
            password: "RjdEDNwhM#w0Q5ziM!!Afp%PAd#dXi",
            database: "holypenguin"
        });

        console.log(get_current_time()+sql_notice+'SQL Verbindung in Registration.js aufgebaut')
        append_log(get_current_time_ohne_blau()+sql_notice_ohne+'SQL Verbindung in Registration.js aufgebaut')
        
        let controll
        let usr_id
        let usr2gm_ID
        sql.query('SELECT * FROM User2Games WHERE gm_ID ="'+gameserver_id+'"', async (err, result)=>{
            if(err){
                append_log(get_current_time_ohne_blau()+sql_error_ohne+'SQL Error in Registration.js: ')
                console.log(err)
            }
            if (result.length>0){
                controll = 1
                usr_id = result[0].usr_ID
                usr2gm_ID = result[0].usr2gm_ID
            }
            else{
                controll = 0
            }
        })
        await sleep(300)
        if(controll === 1){
            sql.query('SELECT * FROM Users WHERE usr_ID="'+usr_id+'" AND usr_Token="'+usertoken+'"', async (err, result)=>{
                if (err){
                    console.log(get_current_time()+sql_error+'SQL Error in Registration.js: ')
                    console.log(err)
                    append_log(get_current_time_ohne_blau()+sql_error_ohne+'SQL Error in Registration.js: \n'+err)
                }
                if(result.length>0){
                    sql.query('SELECT * FROM Discord WHERE usr2gm_ID="'+usr2gm_ID+'" AND dc_Discord_ID="'+dc_user_id+'"', async (err, result)=>{
                        if(err){
                            console.log(get_current_time()+sql_error+general_warning+'SQL Error in Registration:')
                            console.log(err)
                            append_log(get_current_time_ohne_blau()+sql_error_ohne+general_warning_ohne+'SQL Error in Registration: \n'+err)
                        }

                        //falls das result größer als 1 ist dann ist der server entweder schon verbunden oder der user ist geblockt
                        if(result.length>0){
                            
                            //check if blocked
                            if(result[0].dc_Block === "1"){
                                console.log(get_current_time()+discord_notice+'Registration.js abgewiesen: Nutzer ist geblockt!')
                                append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Registration.js abgewisen: Nutzer ist geblockt!')
                                await interaction.reply('Du wurdest vom Server Owner geblockt!')
                            }
                            //sonst ist der server schon verbunden
                            else{
                                console.log(get_current_time()+discord_notice+'Der User ist schon mit diesem Server verbunden!')
                                append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Der User ist schon mit diesem Server verbunden!')
                                await interaction.reply('Dieser Server ist bereits mit diesem Konto verbunden!')
                            }
                        }
                        else{
                            sql.query('SELECT * FROM User2Games WHERE usr_ID="'+usr_id+'"', async(err, result)=>{
                                if(err){
                                    console.log(get_current_time()+sql_error+general_warning+'SQL Error in Registration:')
                                    console.log(err)
                                    append_log(get_current_time_ohne_blau()+sql_error_ohne+general_warning_ohne+'SQL Error in Registration: \n'+err)
                                }
                                if(result.length>0){
                                    console.log(get_current_time()+discord_notice+'Nutzer '+dc_user_id+' wird registriert...')
                                    append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Nutzer '+dc_user_id+' wird registriert...')
                                    sql.query('INSERT INTO `discord` (`usr2gm_ID`, `dc_Discord_ID`, `dc_Block`) VALUES ("'+usr2gm_ID+'", "'+dc_user_id+'", "0")', async (err, result)=>{
                                        if(err){
                                            console.log(get_current_time()+sql_error+general_warning+'SQL Error in Registration.js')
                                            console.log(err)
                                            append_log(get_current_time_ohne_blau()+sql_error_ohne+general_warning_ohne+'SQL Error in Registration.js \n'+err)
                                            await interaction.reply('Bei uns ist ein Fehler aufgetreten! Bitte versuche es nocheinmal oder Kontaktiere Sir Berg oder Svenum!')
                                        }
                                        else{
                                            console.log(get_current_time()+sql_notice+'Der User '+dc_user_id+' hat das Spiel mit der ID: '+gameserver_id+' mit seinem Konto verbunden!')
                                            append_log(get_current_time_ohne_blau()+sql_notice_ohne+'Der User '+dc_user_id+' hat das Spiel mit der ID: '+gameserver_id+' mit seinem Konto verbunden!')
                                            const embed = new Discord.MessageEmbed()
                                            embed.setColor('#bb04db')
                                            embed.setTitle('Erfolg!')
                                            embed.setURL('https://holypenguin.de')
                                            embed.setDescription('Dein Server ist nun Verbunden! Viel Spaß mit deinen neuen Commands!')
                                            embed.setThumbnail('https://media.discordapp.net/attachments/768723694666121236/850382374859702302/Logo.png')
                                            embed.setTimestamp()
                                            await interaction.reply({embeds: [embed]})
                                        }
                                    })
                                }
                                else{
                                    await interaction.reply('Dieser Server gehört dir nicht!');
                                }
                            })
                        }
                    })
                }
                else{
                    await interaction.reply('Dieser Nutzer existiert nicht!')
                }
            })
        }
        else{
            await interaction.reply('Dieser Server existiert nicht!')
        }
	},
};