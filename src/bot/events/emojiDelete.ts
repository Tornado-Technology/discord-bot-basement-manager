import { GuildEmoji } from 'discord.js';
import client from '../index';

export default {
  name: 'emojiDelete',
  async execute (emoji: GuildEmoji) {
    if (!client.protection) {
      return;
    }

    await emoji.guild?.emojis.create({
      attachment: emoji.url,
      name: emoji.name ?? 'Restored emoji',
      reason: 'Restored from deletion.',
    });
  }
};
