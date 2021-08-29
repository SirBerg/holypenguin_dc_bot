/////////////////////////////////
//BITTE readme.md beachten!!!!!/
////////////////////////////////

const colors = require('colors')

let general_error, sql_error, api_error, get_error, post_error, next_js_error, discord_error, filesystem_module_error
let general_warning, api_warning, get_warning, post_warning, sql_warning, next_js_warning, discord_warning, filesystem_module_warning
let node_js_emergency, discord_js_emergency, filesystem_module_emergency

general_error = '[Error] '.red
sql_error = '[SQL ERROR] '.red
api_error = '[API Error] '.red
get_error = '[GET Error] '.red
post_error = '[POST Error] '.red
next_js_error = '[NEXT JS Error]'.red
discord_error = '[DISCORD Error] '.red
filesystem_module_error = '[FILESYSTEM MODULE Error] '.red

general_warning = '[GENERAL Warning]'.yellow
sql_warning='[SQL Warning] '.yellow
api_warning='[API Warning] '.yellow
get_warning='[GET Warning] '.yellow
post_warning='[POST Warning] '.yellow
next_js_warning='[NEXT JS Warning] '.yellow
discord_warning = '[DISCORD Warning] '.yellow
filesystem_module_warning = '[FILESYSTEM_MODULE Warning'.yellow

node_js_emergency = '[NODEJS EMERGENCY] '.bgRed
discord_js_emergency = '[DISCORD JS EMERGENCY] '.bgRed
filesystem_module_emergency = '[FILESYSTEM_MODULE EMERGENCY] '.bgRed

exports.general_warning = general_warning
exports.sql_warning = sql_warning
exports.api_warning=api_warning
exports.get_warning=api_warning
exports.post_warning=post_warning
exports.nextjs_warning = next_js_warning
exports.discord_warning = discord_warning
exports.filesystem_module_warning = filesystem_module_warning

exports.discord_error = discord_error
exports.general_error = general_error
exports.sql_error = sql_error
exports.api_error = api_error
exports.get_error = get_error
exports.post_error = post_error
exports.nextjs_error = next_js_error
exports.filesystem_module_error = filesystem_module_error

exports.node_js_emergency = node_js_emergency
exports.discord_js_emergency = discord_js_emergency
exports.filesystem_module_emergency = filesystem_module_emergency

exports.api_authentication_warning = '[API AUTHENTICATION Warning] '.red.underline

