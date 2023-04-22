import { EmbedBuilder, Interaction } from 'discord.js';
import { information } from '../information.js';

export default {
  name: 'interactionCreate',
  async execute (interaction: Interaction) {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId === 'info') {
      for (const value of interaction.values) {
        const info = information[Number(value) - 1];
        const embed = new EmbedBuilder()
          .setDescription(info.message)
          .setColor(parseInt(info.color, 16));

        await interaction.reply({
          ephemeral: true,
          embeds: [embed],
        });
      }
    }
  }
};
