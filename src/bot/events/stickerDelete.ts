import { Sticker } from 'discord.js';
import client from '../index';

export default {
  name: 'stickerDelete',
  async execute (sticker: Sticker) {
    if (!client.protection) {
      return;
    }

    await sticker.guild?.stickers.create({
      file: sticker.url,
      name: sticker.name,
      tags: sticker.tags ?? '',
      description: sticker.description,
      reason: 'Restored for deletion!'
    });
  }
};
