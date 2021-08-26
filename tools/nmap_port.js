async function nmap_port(port){
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
        await sleep(500)
    })
    return status
}
module.exports.nmap_port = nmap_port()