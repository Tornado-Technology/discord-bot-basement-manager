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
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    client.protection = interaction.options.getString('state');
    await interaction.reply({
      content: `Server protection state set to ${client.protection ? 'enable' : 'disable'}`,
      ephemeral: true,
    });
    setTimeout(() => {
      interaction.deleteReply()
    }, 5000);
  },
};
