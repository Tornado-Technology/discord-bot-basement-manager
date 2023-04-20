import { MessageReaction, User } from 'discord.js';
import { ReactionMessageModel } from '../schemas/reactionMessage.js';
import client from '../index.js';

export default {
  name: 'messageReactionAdd',
  async execute (reaction: MessageReaction, user: User) {
    if (user === client.user) {
      return;
    }

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(`Something went wrong when fetching the message: ${error}`);
        return;
      }
    }

    const { guildId, channelId } = reaction.message;
    const reactionMessage = await ReactionMessageModel.findOne({
      guildId,
      channelId,
      messageId: reaction.message.id,
      reaction: reaction.emoji.name,
    });

    const member = await reaction.message.guild?.members.cache.get(user.id);
    if (reactionMessage) {
      const role = await member?.guild.roles.fetch(reactionMessage.roleId);
      if (role) {
        await member?.roles.add(role);
      }
      return;
    }

    if (reaction.emoji.name === '🍍' && !member?.roles.cache.get('1088349504094359572') && !member?.roles.cache.get('1048590352845635595') && member?.user.id !== '828574119439368222' && member?.user.id !== '260814562276671498') {
      await reaction.remove();
    }
  }
};
