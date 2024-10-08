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
          content:
            '**Если имеются вопросы — обязательно обратись к этим людям:**\n' +
            '<@921798579692122163>\n' +
            '<@344083304959705088>\n' +
            '<@967601899547295764>',
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
