const { SlashCommandBuilder } = require('@discordjs/builders')
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Only for Testing purposes'),
    async execute(interaction) {
        const { JsonDB } = require("node-json-db")
        const { Config } = require("node-json-db/dist/lib/JsonDBConfig")
        var db2 = new JsonDB(new Config("./config.json"), true, false, '/')
        let path = db2.getData('/path')
        await interaction.reply(path)
    }
}