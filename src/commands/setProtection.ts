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
    console.log(interaction.user.id);
    if (interaction.user.id !== '967601899547295764' && interaction.user.id !== '344083304959705088') {
      await interaction.reply({
        content: 'You haven\'t permission for this action!',
        ephemeral: true,
      });
      return;
    }
    // @ts-ignore
    client.protection = interaction.options.getBoolean('state');
    await interaction.reply({
      content: `Server protection state set to ${client.protection ? 'enable' : 'disable'}`,
      ephemeral: true,
    });
  },
};
