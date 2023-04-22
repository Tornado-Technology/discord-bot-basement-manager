import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ChannelType,
  CommandInteraction,
  ButtonStyle,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ButtonInteraction
} from 'discord.js';
import { createCanvas } from 'canvas';
import { verify } from '../utilities/verification.js';
import {text} from "stream/consumers";

const canvas = createCanvas(500, 200);
const context = canvas.getContext('2d');
context.textAlign = 'center';

const fillBackground = (color: string) => {
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const fillMainText = (text: string, x: number, y: number) => {
  context.font = '30px Impact';
  context.fillStyle = '#000000';
  context.fillText(text, x, y);
};

const fillSubText = (text: string, x: number, y: number) => {
  context.font = '20px Impact';
  context.fillStyle = '#797979';
  context.fillText(text, x, y);
};

const generateAttachment = (): AttachmentBuilder => {
  return new AttachmentBuilder(canvas.toBuffer('image/png'), {
    name: 'image.png'
  });
};

const createImage = (main: string, sub: string): AttachmentBuilder => {
  fillBackground('#ffffff');
  fillMainText(main, canvas.width / 2, canvas.height / 2);
  fillSubText(sub, canvas.width / 2, canvas.height / 2 + 30);
  return generateAttachment();
};

const createVerificationImage = (): AttachmentBuilder => {
  return createImage('ВЕРЕФИКАЦИЯ', 'Пройдите опрос ниже');
};

const createWrongImage = (): AttachmentBuilder => {
  return createImage('Вы гений', '🐡');
};

export default {
  command: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Starts user verification.'),
  execute: async function (interaction: CommandInteraction) {
    const row = new ActionRowBuilder().addComponents([
      new ButtonBuilder({
        customId: 'human',
        emoji: '🐡',
        label: 'Я человек',
        style: ButtonStyle.Secondary,
      }),
      new ButtonBuilder({
        customId: 'bot',
        emoji: '🐡',
        label: 'Я бот',
        style: ButtonStyle.Secondary,
      }),
      new ButtonBuilder({
        customId: 'help',
        emoji: '🐡',
        label: 'Помощь',
        style: ButtonStyle.Secondary,
      }),
    ]);

    const reply = await interaction.reply({
      // @ts-ignore
      components: [row],
      files: [createVerificationImage()],
    });

    const filter = () => true;
    const collector = reply.createMessageComponentCollector({ filter });
    collector.on('collect', async (buttonInteraction: ButtonInteraction) => {
      switch (buttonInteraction.customId) {
        case 'human':

          const passTest = async (buttonInteraction: ButtonInteraction) => {
            const options = {
              ephemeral: true,
              content: 'Вы прошли тест'
            };

            if (buttonInteraction.replied) {
              await buttonInteraction.followUp(options);
            } else {
              await buttonInteraction.reply(options);
            }
          };

          const wrongTest = async (buttonInteraction: ButtonInteraction) => {
            const options = {
              ephemeral: true,
              files: [createWrongImage()],
            };

            if (buttonInteraction.replied) {
              await buttonInteraction.followUp(options);
            } else {
              await buttonInteraction.reply(options);
            }
          };

          await verify(buttonInteraction, async (buttonInteraction: ButtonInteraction) => {
            await verify(buttonInteraction, passTest, wrongTest);
          }, wrongTest);
          break;

        case 'bot':
          await buttonInteraction.reply({
            ephemeral: true,
            files: [createWrongImage()],
          });
          break;

        case 'help':
          await buttonInteraction.reply({
            ephemeral: true,
            content: 'Че тоо помощи',
          });
          break;
      }
    });
  },
  cooldown: 1,
}
