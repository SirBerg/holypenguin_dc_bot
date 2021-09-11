//sleep funktion
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


exports.scan_for_port= async function scan_for_port(port){
    const isPortReachable = require('is-port-reachable');
    let host_1

    //zieht den host aus der config
    const fs = require('fs')
    await fs.readFile('./config.json', (err, result)=>{
        if(err){
            console.log(err)
        }
        let result_json = JSON.parse(result.toString())
        host_1 = result_json.host
    })
    await sleep(100)

    //checkt ob der port offen ist
    let state_of_port
        state_of_port = await isPortReachable(port, {host: host_1})
        if(state_of_port === true){
            return true
        }
        else{
            return false
        }
}