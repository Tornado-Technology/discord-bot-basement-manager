import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('rolerem')
    .setDescription('desc')
    .addRoleOption((option) =>
      option.setName('role')
        .setDescription('desc')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const role = interaction.options.getRole('role');
    await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role);
  },
}
