import { ChannelType, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { YoutubeNotificationModel } from '../schemas/youtubeNotification.js';

export default {
  command: new SlashCommandBuilder()
    .setName('addyoutubenotificatioin')
    .setDescription('Adds a channel for YouTube notifications.')
    .addStringOption((option) =>
      option
        .setName('yotubechannelid')
        .setDescription('Id YouTube channel for tracking.')
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Channel for sending notifications.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Message sending how notification.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    const youtubeId = interaction.options.getString('yotubechannelid');
    // @ts-ignore
    const channelId = interaction.options.getChannel('channel')?.id;
    // @ts-ignore
    const message = interaction.options.getString('message');

    const model = new YoutubeNotificationModel({
      guildId: interaction.guildId,
      channelId,
      youtubeId,
      message,
    });

    model.save();

    await interaction.reply('The channel has been added to alerts.');
    setTimeout(() => {
      interaction.deleteReply()
    }, 5000);
  },
  cooldown: 10,
}
