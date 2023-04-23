import { ButtonInteraction, Interaction } from 'discord.js';
import { captchaId, passTest, wrongTest } from '../buttons/captcha.js';
import { createWrongImage } from '../utilities/drawCaptcha.js';
import { verify } from '../utilities/verification.js';
import { techSupportId } from '../buttons/techSupport.js';
import { createTechSupportModal } from '../modals/techSupport.js';
import {createReviewModal} from '../modals/review.js';

export default {
  name: 'interactionCreate',
  async execute (interaction: Interaction) {
    if (!interaction.isButton()) return;
    switch (interaction.customId) {
      case captchaId.buttonHuman:
        await verify(interaction, async (interaction: ButtonInteraction) => {
          await verify(interaction, passTest, wrongTest);
        }, wrongTest);
        break;

      case captchaId.buttonBot:
        await interaction.reply({
          ephemeral: true,
          files: [createWrongImage()],
        });
        break;

      case captchaId.buttonHelp:
        await interaction.reply({
          ephemeral: true,
          content: 'Че тоо помощи',
        });
        break;

      case techSupportId.createButton:
        await interaction.showModal(createTechSupportModal())
        break;

      case 'createReview':
        await interaction.showModal(createReviewModal());
        break;
    }
  }
};
