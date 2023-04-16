import { ChannelType, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { ReactionMessageModel } from '../schemas/reactionMessage';

const regex = /:(.*?):/g;

export default {
  command: new SlashCommandBuilder()
    .setName('addreactionmessage')
    .setDescription('Add.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Channel.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Message Id.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reaction')
        .setMinLength(1)
        .setMaxLength(1)
        .setDescription('Reaction.')
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Role.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: CommandInteraction) {
    // @ts-ignore
    const channel = interaction.options.getChannel('channel');
    // @ts-ignore
    const message = await channel.messages.fetch(interaction.options.getString('message'));
    // @ts-ignore
    const role = interaction.options.getRole('role');
    // @ts-ignore
    const reactionString = interaction.options.getString('reaction');
    const match = reactionString.match(regex);
    let reaction: string = reactionString;
    if (match) {
      reaction = match[0];
      reaction = reaction.replaceAll(':', '');
    }

    const model = new ReactionMessageModel({
      guildId: interaction.guildId,
      channelId: channel.id,
      messageId: message.id,
      roleId: role.id,
      reaction,
    });

    model.save();

    await message.react(reactionString);
    await interaction.reply('The channel has been added to reacts.');
    setTimeout(() => {
      interaction.deleteReply()
    }, 5000);
  },
  cooldown: 10,
}
