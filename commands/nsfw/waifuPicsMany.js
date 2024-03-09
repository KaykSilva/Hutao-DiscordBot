const { default: axios } = require("axios");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hentai2")
        .setDescription("Vários hentais aleatórios")
        .addStringOption(option => (
            option
                .setName("categoria")
                .setDescription("Você receberá 5 imagens")
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
            const json = {}
            const {data} = await axios.post(`https://api.waifu.pics/many/nsfw/${category}`,json);
            
            if (data.files && data.files.length > 0) {
                const chunkSize = 5;
                const chunkedUrls = chunkArray(data.files, chunkSize);

                for (const chunk of chunkedUrls) {
                    const spacedUrls = chunk.join('\n\n');
                    await interaction.reply(spacedUrls);
                }
            } else {
                await interaction.reply("Nenhuma imagem disponível para a categoria fornecida.");
            }

        } catch (err) {
            await interaction.reply("Erro ao buscar a imagem");
            console.error("Erro ao buscar imagem", err);
        }

        function chunkArray(array, chunkSize) {
            const result = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
            }
            return result;
        }
    }
    
};
