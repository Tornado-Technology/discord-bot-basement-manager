import { Collection, GuildEmoji, Role } from 'discord.js';

export default {
  name: 'emojiDelete',
  async execute (emoji: GuildEmoji) {
    console.dir(emoji);
    await emoji.guild?.emojis.create({
      attachment: emoji.url,
      name: emoji.name ?? 'Restored emoji',
      reason: 'Restored from deletion.',
    });
  }
};
