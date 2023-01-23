import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import sendMessage from "./sendMessage.js";

export default {
  data: new SlashCommandBuilder()
    .setName('copy')
    .setNameLocalizations({
      ru: 'скопировать',
    })
    .setDescription('Copied message')
    .setDescriptionLocalizations({
      ru: 'Копирует сообщение',
    })
    .addChannelOption((option) =>
      option.setName('channel')
        .setDescription('Message channel')
        .setNameLocalizations({
          ru: 'канал',
        })
        .setDescriptionLocalizations({
          ru: 'Канал для сообщения',
        })
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('message')
        .setDescription('Message ID')
        .setNameLocalizations({
          ru: 'сообщение',
        })
        .setDescriptionLocalizations({
          ru: 'ID сообщения',
        })
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ChannelUpdate)
    .setDMPermission(true),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const messageID = interaction.options.getString('message');

    const message = await channel.messages.fetch(messageID);
    const { content } = message;
    const contents = [];
    const count = Math.ceil(content.length / 2000);

    for (let i = 0; i < count; i++) {
      contents.push(content.slice(i * 2000, (i + 1) * 2000))
    }

    for (const sendMessage of contents) {
      await channel.send(sendMessage);
    }

    await interaction.reply({
      content: 'Сообщение доставленно!',
      ephemeral: true,
    });
  },
}
