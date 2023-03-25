import {ChannelType, CommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder} from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('copy')
    .setDescription('Copys messages from the current channel.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Message channel')
        .setRequired(true))
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Message ID')
        .setRequired(true))
    .addNumberOption((option) =>
      option
        .setName('color')
        .setDescription('The color of the message being sent')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    const channel = interaction.options.getChannel('channel');
    // @ts-ignore
    const messageId = interaction.options.getString('message');
    // @ts-ignore
    const color = interaction.options.getNumber('color');


    const message = await channel.messages.fetch(messageId);
    const { content } = message;
    const contents = [];
    const count = Math.ceil(content.length / 2000);

    for (let i = 0; i < count; i++) {
      contents.push(content.slice(i * 2000, (i + 1) * 2000))
    }

    for (const sendMessage of contents) {
      await channel.send({embeds: [
        new EmbedBuilder()
          .setColor(color)
          .setDescription(sendMessage)
        ]});
    }

    await interaction.reply({
      content: 'Message sent!',
      ephemeral: true,
    });

    setTimeout(() => {
      interaction.deleteReply()
    }, 5000);
  },
  cooldown: 10,
}
