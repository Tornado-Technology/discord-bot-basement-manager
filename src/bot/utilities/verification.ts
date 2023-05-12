import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ButtonInteraction
} from 'discord.js';

import { createImage } from './drawCaptcha.js';
const captcha = {
  '🍍': 'Жёлтый ананас',
  '🐸': 'Зелёный лягух',
  '🐠': 'Жёлтый рыб',
  '🔮': 'Магический шар',
  '🎤': 'Странный микрофон',
  '🍕': 'Кусок питцы',
  '🦑': 'Весёлый Кальмар',
  '💀': 'Белый череп',
  '🦀': 'Крабовый рейв',
  '🦗': 'Прыгучий кузнечик',
  '🐡': 'Колучая фуга',
  '❤': 'Красное сердце',
  '💥': 'Крутой взрыв',
  '👽': 'Серый пришелец',
  '😈': 'Фиолетовый чъёрт',
  '🐢': 'Быстрый черепах',
};

const keys = Object.keys(captcha);
const values = Object.values(captcha);
const length = keys.length;
const count = 5;

const randomRange = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createComponents = (emojis: string[], labels: string[], active: boolean = true) => {
  const components = [];
  for (let i = 0; i < count; i++) {
    components.push(new ButtonBuilder()
      .setCustomId(`${i}`)
      .setEmoji(emojis[i])
      //.setLabel(labels[i])
      .setDisabled(!active)
      .setStyle(ButtonStyle.Secondary)
    )
  }
  return components;
};

export const verify = async (interaction: ButtonInteraction, successCallback: Function, wrongCallback: Function) => {
  const components: ButtonBuilder[] = [];
  const index = randomRange(0, count - 1);
  const emojis: string[] = [];
  const labels: string[] = [];
  const indexes: (number)[] = [];

  for (let i = 0; i < count; i++) {
    let num: number = -1;
    while (num === -1 || indexes.includes(num)) {
      num = randomRange(0, length - 1);
    }

    indexes.push(num);
    emojis.push(keys[num]);
    labels.push(values[num]);
  }

  const attachment = createImage(`${labels[index]}`.toUpperCase(), `Выберите смайл ниже`);
  const row = new ActionRowBuilder().addComponents(createComponents(emojis, labels));
  const options = {
    ephemeral: true,
    components: [row],
    files: [attachment],
    fetchReply: true,
  };

  // @ts-ignore
  const reply = interaction.replied ? await interaction.followUp(options) : await interaction.reply(options);

  const filter = () => true;
  const collector = reply.createMessageComponentCollector({ filter });
  collector.on('collect', async (buttonInteraction: ButtonInteraction) => {
    await buttonInteraction.update({
      // @ts-ignore
      components: [],
    });
    if (buttonInteraction.customId === `${index}`) {
      await successCallback(buttonInteraction);
      return;
    }
    await wrongCallback(buttonInteraction);
  });
}
