const colors = require('colors')
exports.get_current_time =  function get_current_time(){
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let day = new Date().getUTCDate()
    let months = new Date().getMonth() +1
    let time = '[['+day+'.'+months+'] '+hours+':'+minutes+':'+seconds+'] '
    return time.blue
}
exports.get_current_time_friendly = function get_current_time(){
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let day = new Date().getUTCDate()
    let months = new Date().getMonth() +1
    let time = day+'_'+months+'__'+hours+'_'+minutes+'_'+seconds+''
    return time
}