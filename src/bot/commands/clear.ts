import { ChannelType, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default {
  command: new SlashCommandBuilder()
    .setName('clear')
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
    const messageCount = Number(interaction.options.get('messagecount')?.value);

    interaction.channel?.messages.fetch({ limit: messageCount }).then(async (messages) => {
      if (interaction.channel?.type === ChannelType.DM) {
        return;
      }

      const deletedMessages = await interaction.channel?.bulkDelete(messages,true);
      if (deletedMessages?.size === 0) {
        await interaction.reply('No messages were deleted.')
      } else {
        await interaction.reply(`Successfully deleted ${deletedMessages?.size} message(s)`)
      }

      setTimeout(() => {
        interaction.deleteReply()
      }, 5000);
    });
  },
  cooldown: 10,
}
