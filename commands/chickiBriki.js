import { SlashCommandBuilder } from 'discord.js';

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const replicas = [
  'ЧукаПука',
  'ПукаДрюка',
  'ДюкаВука',
  'МукаВука',
  'ДюкаВкука',
  'ВадюкаМука',
  'БукаКука',
  'МалюкаДипука',
  'ПупикаДипика',
  'ВапукаНюка',
  'МумкаЦупука',
  'ЗюпукаМадюка',
  'БюкуВука',
];

export default {
  data: new SlashCommandBuilder()
    .setName('чикибрики')
    .setDescription('Генерирует чикибрики'),
  async execute(interaction) {
    await interaction.reply(replicas[randomInteger(0, replicas.length - 1)]);
  },
}
