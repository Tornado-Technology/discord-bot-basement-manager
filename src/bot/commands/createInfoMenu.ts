import {
  ChannelType,
  CommandInteraction,
  ButtonStyle,
  PermissionFlagsBits,
  SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, StringSelectMenuBuilder,
} from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('create_info_menu')
    .setDescription('Create info menu.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async function (interaction: CommandInteraction) {
    const row = new ActionRowBuilder().addComponents([
      new StringSelectMenuBuilder()
        .setCustomId('info')
        .setPlaceholder('Ничего не выбранно')
        .addOptions([
          {
            description: 'Что это за сервер?',
            label: 'Первые шаги',
            value: '1',
          },
          {
            description: 'Как здесь ориентироваться?',
            label: 'Путеводитель',
            value: '2',
          },
          {
            description: 'А что насчёт ботов? ',
            label: 'Дискорд боты',
            value: '3'
          }
        ])
    ]);

    const embed = new EmbedBuilder()
      .setDescription('Данный дискорд сервер имеет очень сложную конструкцию, которую не каждому новому Участнику получится понять в первое время.\nПеред тем, как пользоваться чатами сервера — мы настоятельно рекомендуем Вам прочитать всю информацию в данном канале, а также в ветке "информационные каналы", которые обязательно помогут и дадут ответы на Ваши вопросы и недопонимания!\nЭто очень Важно. Уделите, пожалуйста, 5 минут, и Вам станет гораздо проще в будущем!')
      .setColor(parseInt('740078', 16));

    await interaction.channel?.send({
      // @ts-ignore
      components: [row],
      embeds: [embed],
      fetchReply: true,
    })
  },
  cooldown: 1,
}
