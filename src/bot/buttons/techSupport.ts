import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';

export enum techSupportId {
  createButton = 'techSupportLetter',
}

export const createTechSupportButtons = () => {
  return new ActionRowBuilder().addComponents([
    new ButtonBuilder({
      customId: techSupportId.createButton,
      emoji: '➕',
      style: ButtonStyle.Secondary,
    })
  ]);
};
