const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')

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
const {general_notice, discord_notice} = require('../helper/states.js')
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

const path = db.getData("/path")

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
        console.log(dc_user_id)

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
        sql.query('SELECT * FROM User2Games WHERE gm_ID ="'+gameserver_id+'"', async (err, result)=>{
            if(err){
                append_log(get_current_time_ohne_blau()+sql_error_ohne+'SQL Error in Registration.js: ')
                console.log(err)
            }
            if (result.length>0){
                controll = 1
                usr_id = result[0].usr_ID
            }
            else{
                controll = 0
            }
        })
        await sleep(100)
        if(controll === 1){
            sql.query('SELECT * FROM Users WHERE usr_ID="'+usr_id+'" AND usr_Token="'+usertoken+'"', async (err, result)=>{
                if (err){
                    console.log(get_current_time()+sql_error+'SQL Error in Registration.js: ')
                    console.log(err)
                    append_log(get_current_time_ohne_blau()+sql_error_ohne+'SQL Error in Registration.js: \n'+err)
                }
                if(result.length>0){
                    console.log()
                }
                else{
                    await interaction.reply('Dieser Server gehört dir nicht!');
                }
            })
        }
        else{
            await interaction.reply('Dieser Server existiert nicht!')
        }

	},
};