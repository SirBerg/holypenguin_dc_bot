const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('registration')
		.setDescription('Verbinde dich mit deinem Game Server!')
        .addStringOption(option =>
            option.setName('gameserver')
                .setDescription('Die ID deines GameServers')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('usertoken')
                .setDescription('Dein Usertoken von holypenguin.de')
                .setRequired(true)
        ),
	async execute(interaction) {
		await interaction.reply('WIP');
	},
};