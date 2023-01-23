import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('message')
    .setNameLocalizations({
      ru: 'сообщение',
    })
    .setDescription('Sends a message on behalf of the bot')
    .setDescriptionLocalizations({
      ru: 'Отправляет сообщение от имени бота',
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
      option.setName('text')
        .setDescription('Message Text')
        .setNameLocalizations({
          ru: 'текст',
        })
        .setDescriptionLocalizations({
          ru: 'Текст сообщения',
        })
        .setRequired(true)
        .setMaxLength(2000))
    .addNumberOption((option) =>
      option.setName('color')
        .setDescription('The color of the message being sent')
        .setNameLocalizations({
          ru: 'цвет',
        })
        .setDescriptionLocalizations({
          ru: 'Цвет отправляемого сообщения',
        })
        .setRequired(true))
    .addBooleanOption((option) =>
        option.setName('embed')
          .setDescription('Using embed?')
          .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(true),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const text = interaction.options.getString('text');
    const color = interaction.options.getNumber('color');
    const embed = interaction.options.getBoolean('embed')

    if (embed) {
      await channel.send({
        embeds: [new EmbedBuilder()
          .setDescription(text)
          .setColor(color)
        ]});
    } else {
      await channel.send({
        content: text,
      });
    }

    await interaction.reply({
      content: 'Сообщение доставленно!',
      ephemeral: true,
    });
  },
}
