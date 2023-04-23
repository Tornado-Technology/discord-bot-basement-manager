import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';

export enum reviewId {
  modal = 'review',
  opinionInput = 'opinion',
  upgradeInput = 'upgrade',
  evaluationInput = 'evaluation',
}

export const createReviewModal = (): ModalBuilder => {
  const opinionInput = new TextInputBuilder()
    .setCustomId(reviewId.opinionInput)
    .setPlaceholder('Опишите ваше мнение о сервере.')
    .setLabel('Мнение')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1900)
    .setRequired(true);

  const upgradeInput = new TextInputBuilder()
    .setCustomId(reviewId.upgradeInput)
    .setPlaceholder('Что бы вы хотели добавить на данный серевер?')
    .setLabel('Улучшения')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1900)
    .setRequired(true);

  const evaluationInput = new TextInputBuilder()
    .setCustomId(reviewId.evaluationInput)
    .setLabel('Ваша оценка от  1 до 10')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(2)
    .setRequired(true)

  const components: ActionRowBuilder[] = [
    new ActionRowBuilder().addComponents([opinionInput]),
    new ActionRowBuilder().addComponents([upgradeInput]),
    new ActionRowBuilder().addComponents([evaluationInput]),
  ];

  return new ModalBuilder()
    .setCustomId(reviewId.modal)
    .setTitle('Оставить мнение о сервере')
    // @ts-ignore
    .addComponents(components);
}