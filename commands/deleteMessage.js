import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';

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
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MessageDelete)
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
