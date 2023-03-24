import { Sticker } from 'discord.js';

export default {
  name: 'stickerDelete',
  async execute (sticker: Sticker) {
    console.dir(sticker);
    await sticker.guild?.stickers.create({
      file: sticker.url,
      name: sticker.name,
      tags: sticker.tags ?? '',
      description: sticker.description,
      reason: 'Restored for deletion!'
    });
  }
};
