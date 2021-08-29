const colors = require('colors')
exports.get_current_time_ohne_blau =  function get_current_time_ohne_blau(){
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let day = new Date().getUTCDate()
    let months = new Date().getMonth() +1
    let time = '[['+day+'.'+months+'] '+hours+':'+minutes+':'+seconds+'] '
    return time
}