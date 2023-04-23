import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export enum techSupportModalId {
  modal = 'techSupport',
  messageInput = 'message',
}

export const createTechSupportModal = () => {
  return new ModalBuilder()
    .setCustomId(techSupportModalId.modal)
    .setTitle('Оставить мнение о сервере')
    // @ts-ignore
    .addComponents([
      new ActionRowBuilder().addComponents([
        new TextInputBuilder()
        .setCustomId(techSupportModalId.messageInput)
        .setPlaceholder('Опишите вопрос, жалобы, предложения.')
        .setLabel('Для чего ты создаешь билет?')
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(1900)
        .setRequired(true)
      ]),
    ]);
};