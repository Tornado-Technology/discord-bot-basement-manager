import { SlashCommandBuilder } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { reactionMessages } from '../index.js';
import { ReactionMessage } from '../reactionMessage.js';

const regex = /:(.*?):/g;

export default {
  data: new SlashCommandBuilder()
    .setName('reactionmessage')
    .setDescription('a')
    .addStringOption((option) =>
      option.setName('message')
        .setDescription('a'))
    .addStringOption((option) =>
      option.setName('reaction')
        .setDescription('a'))
    .addRoleOption((option) =>
      option.setName('role')
        .setDescription('a'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
  async execute(interaction) {
    const channel = interaction.channel;
    const message = await channel.messages.fetch(interaction.options.getString('message'));
    const role = interaction.options.getRole('role');
    const reactionString = interaction.options.getString('reaction');
    const match = reactionString.match(regex);
    console.log(reactionString)

    let reaction;
    if (match) {
      reaction = match[0];
      reaction = reaction.replaceAll(':', '');
    } else {
      reaction = reactionString;
      console.log(reactionString)
    }

    console.log(reaction)

    reactionMessages.push(new ReactionMessage(interaction.guild.id, interaction.channel.id, message.id, reaction, role.id));
    await message.react(reactionString);
  },
}
