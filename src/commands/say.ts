import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say.')
    .addStringOption((option) =>
      option
        .setName('message')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    const text = interaction.options.getString('message');
    interaction.channel?.send(text);
  },
};
