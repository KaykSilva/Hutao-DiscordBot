const { default: axios } = require("axios");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hentai")
        .setDescription("Hentai aleatório")
        .addStringOption(option => (
            option
                .setName("categoria")
                .setDescription("Você receberá uma imagem")
                .setRequired(true)
                .addChoices(
                    { name: 'waifu', value: 'waifu' },
                    { name: 'neko', value: 'neko' },
                    { name: 'trap', value: 'trap' },
                    { name: 'boquete', value: 'blowjob' },
                )
                
        )),
    async execute(interaction) {
        const category = interaction.options.getString('categoria');

        try {
            const {data} = await axios.get(`https://api.waifu.pics/nsfw/${category}`);
            await interaction.reply(data.url);
        } catch (err) {
            await interaction.reply("Erro ao buscar a imagem");
            console.error("Erro ao buscar imagem", err);
        }
    }
};
