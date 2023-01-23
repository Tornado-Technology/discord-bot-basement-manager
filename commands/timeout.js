import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setNameLocalizations({
      ru: 'таймаут',
    })
    .setDescription('desc')
    .addUserOption((option) =>
      option.setName('member')
        .setNameLocalizations({
          ru: 'участник',
        })
        .setDescription('desc')
        .setRequired(true))
    .addNumberOption((option) =>
      option.setName('time')
        .setNameLocalizations({
          ru: 'время',
        })
        .setDescription('desc')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks),
  async execute(interaction) {
    const user = interaction.options.getUser('member');
    const time = interaction.options.getNumber('time');

    await interaction.guild.members.cache.get(user.id).timeout(time * 1000);

    await interaction.reply({
      content: 'Успешно замучен',
      ephemeral: true,
    });
  },
}
