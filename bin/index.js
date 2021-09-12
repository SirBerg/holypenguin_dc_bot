#! /usr/bin/env node
//What is this?
//this is used for the TotallyAwesomeNodeCLI aka. (tancli)
//this cli will be updated with new commands when i get to it

//for command arguments
const yargs = require('yargs')


const jwt = require('jsonwebtoken')

const options = yargs
.usage("Usage: -u <true/false>")
.option("u", {alias: "utility", describe: "Starts this CLI in Utlity or Node jS Mode (utility is required for some functions)", type: "string", demandOption: true})
.option("n", {alias: "node", describe: "Gets you to the Node process. ASAP", demandOption: false})
.option("j", {alias: "jwt", describe: "Will start a JWT token generation. You will need to Specify the Private Key value, as well as a valid json string for this to work (lookup -pk and -json for additional information", type: "string", demandOption: false})
.option("p", {alias: "private_key", describe:"Is required for the JWT token Generation, this can be a String or just a simple word. This String or Word must be known to decrypt this JWT!", type:"string", demandOption:false})
.option("J", {alias: "json", describe:"This json is the 'Payload' for the JWT, meaning the Actual value that will be transported through the JWT. This NEEDS to be a valid JSON string! THIS NEEDS TO BE IN SINGLE QUOTA!!! (Like this: '{')", type: "string", demandOption:false})
.option('s', {alias: "scan", describe:"scans for a specified port on the host specified in config.json", type: "string", demandOption:false})
.argv;

if(options.utility === "true" || options.utility === "True"){

    //this is stupid but yargs has forced my hand
    if(options.jwt === ""){
        if (options.private_key && options.json){
            console.log('Everything present, starting JWT process')
            let token = jwt.sign(options.json, options.private_key, (err, token)=>{
                if(err){
                    console.log('Error while generating JWT: '+err)
                }
                console.log('Your JWT token: '+token)
            })
        }
        else{
            console.log('There is something missing... Did you append the -p AND -J options?')
        }
    }
    else if (options.scan){
        async function wrap(){
            console.log('Starting Scan (false if port is closed, true if open)')
            const {scan_for_port} = require('../helper/scan_for_port.js')
            console.log(await scan_for_port(options.scan))
        }
        wrap()
    }
}
else{
    
}
