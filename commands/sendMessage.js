import { PermissionsBitField, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

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
    .addStringOption((option) =>
      option.setName('title')
        .setDescription('Message title')
        .setNameLocalizations({
          ru: 'заголовок',
        })
        .setDescriptionLocalizations({
          ru: 'Текст заоголвка',
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
        .setRequired(true))
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
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ChannelUpdate)
    .setDMPermission(true),
  async execute(interaction) {
    const title = interaction.options.getString('title');
    const text = interaction.options.getString('text');
    const color = interaction.options.getNumber('color')

    await interaction.reply({
      embeds: new EmbedBuilder()
        .setTitle(title)
        .setDescription(text)
        .setColor(color)
    });
    await interaction.delete();
  },
}
