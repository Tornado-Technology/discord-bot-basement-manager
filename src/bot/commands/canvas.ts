import {
  ActionRowBuilder,
  AttachmentBuilder, ButtonBuilder,
  ChannelType,
  CommandInteraction,
  ButtonStyle,
  PermissionFlagsBits,
  SlashCommandBuilder, ButtonInteraction
} from 'discord.js';
import { createCanvas, loadImage } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
const length = Object.keys(captcha).length;
const keys = Object.keys(captcha);
const values = Object.values(captcha);

const randomRange = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
  command: new SlashCommandBuilder()
    .setName('canvas')
    .setDescription('Canvas.'),
  execute: async function (interaction: CommandInteraction) {
    const components = [];
    const count = 5;
    const index = randomRange(0, count - 1);
    const emojis = [];
    const labels = [];
    const indexes: (number)[] = []

    for (let i = 0; i < count; i++) {
      let num: number = -1;
      while (num === -1 || indexes.includes(num)) {
        num = randomRange(0, length - 1);
      }

      indexes.push(num);
      emojis.push(keys[num]);
      labels.push(values[num]);
    }

    console.log(indexes);
    console.log(emojis);
    console.log(labels);

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
    const reply = await interaction.reply({
      // @ts-ignore
      components: [row],
      files: [attachment],
    });

    const filter = () => true;
    const collector = reply.createMessageComponentCollector({ filter });
    collector.on('collect', async (buttonInteraction: ButtonInteraction) => {
      if (buttonInteraction.customId === `${index}`) {
        await buttonInteraction.reply({
          ephemeral: true,
          content: 'Вы прошли тест на игоря!'
        });
        return;
      }
      await buttonInteraction.reply({
        ephemeral: true,
        content: 'Вы игорь плеханов'
      });
    });
  },
  cooldown: 1,
}
