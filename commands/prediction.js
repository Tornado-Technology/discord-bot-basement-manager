import { SlashCommandBuilder } from 'discord.js';

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const replicas = [
  'Типа да',
  'Нет',
  'Наверное',
  'Очень возможно',
  '100%',
  'Естественно',
  'Как могло быть иначе',
  'Никогда',
  'Невозможно',
  'Шансы <0%',
  'Ошибка модуляции, попробуйте позже',
  'Незнаю',
  'Вероятность 50%',
  'Это не так!',
  'Это нитак',
  'Они здесь',
  'Я вижу дух Чая, он скажет следущий ответ',
  'Вероятность - КРАЙНЕ МАЛА',
];

export default {
  data: new SlashCommandBuilder()
    .setName('prediction')
    .setDescription('Allows you to predict certain events. The bot bases its answers on quantum theory of probability')
    .setNameLocalizations({
      ru: 'предсказание',
    })
    .setDescriptionLocalizations({
      ru: 'Позволяет вам предсказать некоторые события. Бот основывает ответы на квантовой теории вероятности',
    })
    .addStringOption((option) => (
      option.setName('event')
        .setDescription('Precise event description for quantum modulation')
        .setNameLocalizations({
          ru: 'событие',
        })
        .setDescriptionLocalizations({
          ru: 'Точное описание события для квантовой модуляции',
        })
        .setMaxLength(1900)
        .setRequired(false)
    )),
  async execute(interaction) {
    const message = interaction.options.getString('event') ?? '';
    const result = `${message} - ${replicas[randomInteger(0, replicas.length - 1)]}`;
    await interaction.reply(result);
  },
}
