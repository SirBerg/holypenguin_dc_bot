//Für Discord JS Command Collection
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { JsonDB } = require("node-json-db")
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")
var db = new JsonDB(new Config("./config.json", true, false, '/'));
var db2 = new JsonDB(new Config("./commands/config.json"), true, false, '/')
// Sleep Funktion
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//errors und states
const {node_js_emergency, filesystem_module_emergency, discord_js_emergency} = require("./helper/error.js")
const { discord_error, filesystem_module_error, general_error } = require('./helper/error.js')
const {discord_warning, filesystem_module_warning, general_warning} = require('./helper/error.js')
const {general_notice, discord_notice} = require('./helper/states.js')
const {node_js_emergency_ohne, filesystem_module_emergency_ohne, discord_js_emergency_ohne} = require('./helper/error_ohne.js')
const {discord_error_ohne, filesystem_module_error_ohne, general_error_ohne } = require('./helper/error_ohne.js')
const {discord_warning_ohne, general_warning_ohne, filesystem_module_warning_ohne } = require('./helper/error_ohne.js')
const {general_notice_ohne, discord_notice_ohne } = require('./helper/states_ohne.js')
const { get_current_time, get_current_time_friendly }= require('./helper/get_current_time.js');
const { get_current_time_ohne_blau } = require('./helper/get_current_time_ohne_blau.js')

console.log(get_current_time()+general_notice+'Startup')

let current_log_file_path
let current_log_file_path_extern
//um an das logfile anzuhängen
async function append_log(value){
    fs.appendFile(current_log_file_path , value+'\n', (err, result)=>{
        if(err){
            console.log(filesystem_module_error+ general_error+'Konnte nicht ins logfile schreiben Grund:\n'+err)
        }
    })
}

//checkt ob bereits ein log file vorhanden ist im ./ ordner:

async function wrapper(){

    fs.readdir("./", async (err, result)=>{
        if(err){
            console.log(filesystem_module_error+general_error+'FEHLER DATEI ROOT ZU LESEN, SCHREIBE EMERGENCY LOG...')
            fs.writeFile('./emergency_log.log','FEHLER: '+err, (err, data)=>{
                if(err){
                    console.log(filesystem_module_emergency+general_error+'KANN EMERGENCY LOG NICHT SCHREIBEN\n Dieses Programm wird nun beendet!')
                    console.log('Der Fehler war: '+err)
                    process.abort()
                }
                    console.log(general_notice+'Ich gehe davon aus das, dass Emergency log geschrieben wurde, du bist auf dich gestellt, viel Glück!')
                    process.abort()
            })
        }
        let i = 0
        do{
            //verschiebt das alte file in old_logs
            if(result[i].includes('.log')){
                fs.rename('./'+result[i], './old_logs/'+result[i], (err)=>{
                    if(err){
                        console.log('Fehler das alte log zu verschieben!')
                        console.log('Der Fehler war: '+err)
                        process.abort()
                    }
                })
            }
            i++
        }while(i<result.length)
        
        //erstellt das logfile
        current_log_file_path = __dirname+ `/`+get_current_time_friendly()+'.log'
        await sleep(100)
        //const { log_file } = require('./tets_class.js')

        //const file_log = new log_file(current_log_file_path)
        //file_log.log('Test')
        //fügt den pfad des logfiles in die config.json ein
        db.push("/path", current_log_file_path.toString())
        db2.push("/path", current_log_file_path.toString())
        
        fs.writeFile(current_log_file_path , get_current_time_ohne_blau()+general_notice_ohne+"Startup \n"+get_current_time_ohne_blau()+general_notice_ohne+"LogFile Erstellt\n", (err, result)=>{
            if(err){
                console.log(general_error+filesystem_module_error+'Das LogFile Konnte nicht erstellt werden')
                console.log(err)
                process.exit()
            }
            else{
                console.log(general_notice+get_current_time()+'Logfile erstellt\n')
            }
        })
    })

    //wartet, da die operationen oben zu lange brauchen
    await sleep(500)

    //Erstellt den Client aka den Bot
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    console.log(get_current_time()+discord_notice+'Client erstellt')
    append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Client erstellt'.toString())
    //Erstellt die Discord Command Collection
    
    client.commands = new Collection();
    console.log(get_current_time()+discord_notice+'Command Collection Erstellt')
    append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Command Collection erstellt')
    
    //handled das array, filtert es und fügt es in die CommandFiles const ein
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    //loopt über das Array Command Files
    for (const file of commandFiles){
        //hier ist jedes command file nach einander verfügbar
    
        const command = require(`./commands/${file}`)
    
        //fügt es zu der Collection hinzu
        client.commands.set(command.data.name, command);
    }
    console.log(get_current_time()+discord_notice+'Commands zur Collection Hinzugefügt')
    append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Commands zur Collection Hinzugefügt')
    client.once('ready', () => {
        console.log(get_current_time()+discord_notice+'Startup Complete, der Bot ist jetzt funktionsfähig');
        append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Startup Complete, der Bot ist jetzt funktionsfähig')
    });
    
    
    //handled die Commands
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;

        const command = client.commands.get(interaction.commandName)

        if(!command) return
        //führt das file aus in dem der Command ist
        try {
            console.log(get_current_time()+discord_notice+'Command Benutzt: '+commandName)
            append_log(get_current_time_ohne_blau()+discord_notice_ohne+'Command Benutzt: '+commandName)
            await command.execute(interaction)
        }
        catch (error) {
            console.log(get_current_time()+general_warning+discord_warning+'Es gab ein Problem bei der Command ausführung: \n'+error)
            append_log(get_current_time_ohne_blau()+general_warning_ohne+discord_warning_ohne+'Es gab ein Problem bei der Commands ausführung: \n'+error)
        }
    });
    
    process.on('exit', ()=>{
        append_log(get_current_time_ohne()+general_notice_ohne+'TERM Signal erhalten')
    })
    
    client.login(token);
}
wrapper()