import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get user avatar')
    .setNameLocalizations({
      ru: 'аватар',
    })
    .setDescriptionLocalizations({
      ru: 'Получает автар пользователя',
    })
    .addUserOption((option) => (
      option.setName('user')
        .setDescription('The user from whom you want to get an avatar')
        .setNameLocalizations({
          ru: 'пользователь',
        })
        .setDescriptionLocalizations({
          ru: 'Пользователь у которого нужно получить аватар',
        })
        .setRequired(false)
    )),
  async execute(interaction) {
    const user = interaction.options.getUser('user') ?? interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const name = member?.nickname ?? user.username;
    const image = member?.avatarURL({ dynamic: true }) ?? user.avatarURL({ dynamic: true });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Аватар пользователя: ${name}`)
          .setImage(image)
          .setURL(image)
      ]
    });
  },
}
