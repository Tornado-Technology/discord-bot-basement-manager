import {CommandInteraction, PermissionFlagsBits, SlashCommandBuilder} from 'discord.js';
import client from '../index.js';

export default {
  command: new SlashCommandBuilder()
    .setName('setprotection')
    .setDescription('Set protection.')
    .addBooleanOption((option) =>
      option
        .setName('state')
        .setDescription('State.')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    if (interaction.user.id !== '967601899547295764' && interaction.user.id !== '344083304959705088') {
      await interaction.reply({
        content: 'You haven\'t permission for this action!',
        ephemeral: true,
      });
    } else {
      // @ts-ignore
      client.protection = interaction.options.getString('state');
      await interaction.reply({
        content: `Server protection state set to ${client.protection ? 'enable' : 'disable'}`,
        ephemeral: true,
      });
    }
    setTimeout(() => {
      interaction.deleteReply()
    }, 5000);
  },
};
