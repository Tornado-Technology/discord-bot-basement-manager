import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

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
    .addBooleanOption((option) =>
      option.setName('embed')
        .setDescription('Using embed?')
        .setRequired(false))
    .addNumberOption((option) =>
      option.setName('color')
        .setDescription('The color of the message being sent')
        .setNameLocalizations({
          ru: 'цвет',
        })
        .setDescriptionLocalizations({
          ru: 'Цвет отправляемого сообщения',
        })
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(true),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const messageID = interaction.options.getString('message');
    const embed = interaction.options.getBoolean('embed') ?? false;
    const color = interaction.options.getNumber('color') ?? 0x00ceff;

    const message = await channel.messages.fetch(messageID);
    const { content } = message;
    const contents = [];
    const count = Math.ceil(content.length / 2000);

    for (let i = 0; i < count; i++) {
      contents.push(content.slice(i * 2000, (i + 1) * 2000))
    }

    for (const sendMessage of contents) {
      if (embed) {
        await channel.send({embeds: [
          new EmbedBuilder()
            .setColor(color)
            .setDescription(sendMessage)
        ]});
        continue;
      }
      await channel.send(sendMessage);
    }

    await interaction.reply({
      content: 'Сообщение доставленно!',
      ephemeral: true,
    });
  },
}
