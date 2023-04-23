import { ChannelType, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Delets messages from the current channel.')
    .addIntegerOption((option) =>
      option
        .setMaxValue(100)
        .setMinValue(1)
        .setName('messagecount')
        .setDescription('Message amount to be cleared')
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: CommandInteraction) {

  },
  cooldown: 10,
}
