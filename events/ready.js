const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Tudo pronto, estou conectada ${client.user.tag}`);
	},
}