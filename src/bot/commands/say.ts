import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say.')
    .addStringOption((option) =>
      option
        .setName('text')
        .setDescription('Text.')
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    const text = interaction.options.getString('text');
    await interaction.channel?.send(text);
    await interaction.reply({
      content: 'Message send!',
      ephemeral: true,
    });
    setTimeout(() => {
      interaction.deleteReply()
    }, 5000);
  },
};
