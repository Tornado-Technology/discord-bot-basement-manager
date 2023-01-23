import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setNameLocalizations({
      ru: 'удалить',
    })
    .setDescription('Deleted message')
    .addChannelOption((option) =>
      option.setName('channel')
        .setDescription('Message channel')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('message')
        .setDescription('Message ID')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(true),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const messageID = interaction.options.getString('message');

    const message = await channel.messages.fetch(messageID);
    await message.delete();

    await interaction.reply({
      content: 'Message deleted!',
      ephemeral: true,
    });
  },
}
