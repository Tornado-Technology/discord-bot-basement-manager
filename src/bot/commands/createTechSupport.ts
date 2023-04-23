import {CommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder} from 'discord.js';
import { createTechSupportButtons } from '../buttons/techSupport.js';

export default {
  cooldown: 60,
  command: new SlashCommandBuilder()
    .setName('create_tech_support')
    .setDescription('Create Tech Support.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async function (interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setDescription(
        'Тех. Поддержка\n' +
        'Вопросы по серверу | Жалобы | Предложения\n' +
        'Для создания билета помощи, воспользуйтесь кнопкой ниже'
      );

    await interaction.channel?.send({
      embeds: [embed],
      // @ts-ignore
      components: [createTechSupportButtons()],
      fetchReply: true,
    });

    await interaction.reply({
      ephemeral: true,
      content: 'Тех. Потдержка успешно создана!',
    });
  },
};
