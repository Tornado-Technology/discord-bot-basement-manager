import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('rawmessage')
    .setDescription('Copied message')
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
    console.log(`Get raw message in ${channel.id} (${messageID}):\n${message}`);

    await interaction.reply({
      content: 'Check console!',
      ephemeral: true,
    });
  },
}
