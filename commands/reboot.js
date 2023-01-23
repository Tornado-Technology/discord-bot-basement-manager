import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('reboot')
    .setNameLocalizations({
      ru: 'перезагрузить',
    })
    .setDescription('Rebooting bot')
    .setDescriptionLocalizations({
      ru: 'Перезагружает бота',
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks),
  async execute(interaction) {
    await interaction.reply({
      content: 'Rebooting...',
      ephemeral: true,
    });

    throw new Error('Reboot!');
  },
}
