import {
  ChannelType,
  CommandInteraction,
  ButtonStyle,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextInputStyle,
} from 'discord.js';
import { createReviewModal } from '../modals/review.js';

export default {
  cooldown: 10,
  command: new SlashCommandBuilder()
    .setName('review')
    .setDescription('Review.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async function (interaction: CommandInteraction) {
    await interaction.showModal(createReviewModal());
  },
}
