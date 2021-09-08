const fs = require('fs')
const { get_current_time_ohne_blau } = require('./helper/get_current_time_ohne_blau.js')

class log_file {
    constructor(path){
        this.path = path
    }
    log (value){
        fs.writefile('./'+path+'.log', get_current_time_ohne_blau()+value ,(err, result)=>{
            if(err){
                console.log(err)
            }
        })
    }
}