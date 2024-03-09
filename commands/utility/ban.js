const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Selecione o elemento a ser banido')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

        async execute(interaction) {
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? '';
    
            const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Banir')
                .setStyle(ButtonStyle.Danger);
    
            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancelar')
                .setStyle(ButtonStyle.Secondary);
    
            const row = new ActionRowBuilder()
                .addComponents(cancel, confirm);
    
            await interaction.reply({
                content: `Tem certeza que deseja banir ${target}? motivos: ${reason}`,
                components: [row],
            });
        },
    }