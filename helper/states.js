const colors = require('colors')

//notices
let api_notice = '[API Notice] '.blue
let general_notice = '[GENERAL Notice] '.blue
let post_notice = '[POST Notice] '.blue
let get_notice = '[GET Notice] '.blue
let sql_notice = '[SQL Notice] '.blue
let nextjs_notice='[NEXT JS Notice] '.blue
let discord_notice = '[DISCORD Notice] '.blue

let api_state_good = '[API STATE GOOD] '.cyan
let general_state_good = '[GENERAL STATE GOOD] '.cyan
let post_state_good = '[POST STATE GOOD] '.cyan
let get_state_good = '[GET STATE GOOD] '.cyan
let sql_state_good = '[SQL STATE GOOD] '.cyan
let nextjs_state_good = '[NEXT JS STATE GOOD] '.cyan
let discord_state_good = '[DISCORD State GOOD] '.cyan

let debug = '[DEBUG] '.magenta

exports.api_state_good = api_state_good
exports.general_state_good = general_state_good
exports.post_state_good = post_state_good
exports.get_state_good = get_state_good
exports.sql_state_good = sql_state_good
exports.nextjs_state_good = nextjs_state_good
exports.discord_notice = discord_notice

exports.api_notice = api_notice
exports.general_notice = general_notice
exports.post_notice = post_notice
exports.get_notice = get_notice
exports.sql_notice = sql_notice
exports.nextjs_notice = nextjs_notice
exports.discord_state_good = discord_state_good

exports.debug = debug
