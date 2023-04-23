import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';
import { createsSuccessfulImage, createWrongImage } from '../utilities/drawCaptcha.js';

const givenRoles = [
  '1053572084921532416', // --------------{Договорённости}--------------
  '1053698231856549939', // Вне команды
  '1053570250601402378', // ------------------{Должности}------------------
  '1048589618137800776', // |Безработицы|
  '1053572099517710397', // ---------------------{Прочее}---------------------
  '1053572111643443290', // |Замечания отсутствуют|
];

export enum captchaId {
  buttonHuman = 'human',
  buttonBot = 'bot',
  buttonHelp = 'help',
}

export const createCaptchaButtons = () => {
  return new ActionRowBuilder().addComponents([
    new ButtonBuilder({
      customId: captchaId.buttonHuman,
      emoji: '🐡',
      label: 'Я человек',
      style: ButtonStyle.Secondary,
    }),
    new ButtonBuilder({
      customId: captchaId.buttonBot,
      emoji: '🐡',
      label: 'Я бот',
      style: ButtonStyle.Secondary,
    }),
    new ButtonBuilder({
      customId: captchaId.buttonHelp,
      emoji: '🐡',
      label: 'Помощь',
      style: ButtonStyle.Secondary,
    }),
  ]);
};

export const passTest = async (buttonInteraction: ButtonInteraction) => {
  if (!buttonInteraction.member) {
    console.error('Interaction member not found!');
    return;
  }

  const guild = buttonInteraction.guild;

  if (!guild) {
    console.error('Interaction guild not found!');
    return;
  }

  const member = await guild.members.fetch(buttonInteraction.member.user.id);

  if (!member) {
    console.error(`Member ${buttonInteraction.member.user.username} not found!`);
    return;
  }

  const options = {
    ephemeral: true,
    content: 'Вы прошли тест',
    files: [createsSuccessfulImage()]
  };

  for (const givenRole of givenRoles) {
    const role = await guild.roles.fetch(givenRole);
    if (role) {
      await member.roles.add(role);
    }
  }

  if (buttonInteraction.replied) {
    await buttonInteraction.followUp(options);
  } else {
    await buttonInteraction.reply(options);
  }
};

export const wrongTest = async (buttonInteraction: ButtonInteraction) => {
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
