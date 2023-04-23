import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('reboot')
    .setDescription('Rebooting bot')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks),
  async execute(interaction: CommandInteraction) {
    await interaction.reply({
      content: 'Rebooting...',
      ephemeral: true,
    });
    throw new Error('Reboot!');
  },
};
