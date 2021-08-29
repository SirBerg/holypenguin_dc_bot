const file = require('./error.js')
let general_notice= file.general_error
let sql_notice = file.sql_error
let api_notice = file.api_error
let get_notice = file.get_error
let post_notice = file.post_error
let nextjs_notice = file.nextjs_error

console.log(general_notice+'APFELTASCHE')
console.log(sql_notice+'APFELTASCHE')
console.log(api_notice+'APFELTASCHE')
console.log(get_notice+'APFELTASCHE')
console.log(post_notice+'APFELTASCHE')
console.log(nextjs_notice+'APFELTASCHE')

let general_state_good = file.general_warning
let sql_state_good = file.sql_warning
let api_state_good = file.api_warning
let get_state_good = file.get_warning
let post_state_good = file.post_warning
let nextjs_state_good = file.nextjs_warning

console.log(general_state_good+'APFELTASCHWARNING')
console.log(sql_state_good+'APFELTASCHEWARNING')
console.log(api_state_good+'APFELTASCHEWARNING')
console.log(get_state_good+'APFELTASCHEWARNING')
console.log(post_state_good+'APFELTASCHEWARNING')
console.log(nextjs_state_good+'APFELTASCHEWARNNG')