import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

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
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Webhook)
    .setDMPermission(true),
  async execute(interaction) {
    await interaction.reply({
      content: 'Rebooting...',
      ephemeral: true,
    });

    throw new Error('Reboot!');
  },
}
