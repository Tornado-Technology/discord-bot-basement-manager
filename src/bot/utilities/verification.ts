import {
  ActionRowBuilder,
  AttachmentBuilder, ButtonBuilder,
  ChannelType,
  ButtonStyle,
  PermissionFlagsBits,
  ButtonInteraction
} from 'discord.js';

import { createCanvas } from 'canvas';
const captcha = {
  '🍍': 'Жёлтый ананас',
  '🐸': 'Зелённый лягух',
  '🐠': 'Жёлтый рыб',
  '🔮': 'Магический шар',
  '🎤': 'Странный микрофон',
  '🍕': 'Кусок питцы',
  '🦑': 'Весмёлый Кальмар',
  '💀': 'Белый череп',
  '🦀': 'Крабовый рейв',
  '🦗': 'Огуречный кузнечик',
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

export const verify = async (interaction: ButtonInteraction, successCallback: Function, wrongCallback: Function) => {
  const components: ButtonBuilder[] = [];
  const emojis = [];
  const labels = [];
  const indexes: (number)[] = []

  const index = randomRange(0, count - 1);

  for (let i = 0; i < count; i++) {
    let num: number = -1;
    while (num === -1 || indexes.includes(num)) {
      num = randomRange(0, length - 1);
    }

    indexes.push(num);
    emojis.push(keys[num]);
    labels.push(values[num]);
  }

  const canvas = createCanvas(500, 200);
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.textAlign = 'center';

  context.font = '30px Impact';
  context.fillStyle = '#000000';
  context.fillText(`${labels[index]}`.toUpperCase(), canvas.width / 2, canvas.height / 2);

  context.font = '20px Impact';
  context.fillStyle = '#797979';
  context.fillText(`Выберете смайл ниже`, canvas.width / 2, canvas.height / 2 + 30);

  const attachment = new AttachmentBuilder(await canvas.toBuffer('image/png'), {
    name: 'image.png'
  });

  for (let i = 0; i < count; i++) {
    components.push(new ButtonBuilder()
      .setCustomId(`${i}`)
      .setEmoji(emojis[i])
      .setLabel(labels[i])
      .setStyle(ButtonStyle.Secondary)
    )
  }

  const row = new ActionRowBuilder().addComponents(components);
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
      files: [attachment],
    });
    if (buttonInteraction.customId === `${index}`) {
      await successCallback(buttonInteraction);
      return;
    }
    await wrongCallback(buttonInteraction);
  });
}
