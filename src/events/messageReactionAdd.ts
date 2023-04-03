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

    if (reactionMessage) {
      const member = await reaction.message.guild?.members.cache.get(user.id);
      const role = await member?.guild.roles.fetch(reactionMessage.roleId);
      if (role) {
        await member?.roles.add(role);
      }
      return;
    }

    if (reaction.emoji.name === '🍍') {
      await reaction.remove();
    }
  }
};
