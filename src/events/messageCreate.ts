import { Message } from 'discord.js';

export default {
  name: 'messageCreate',
  async execute (message: Message) {
    if (message.content.includes('🍍')) {
      await message.delete();
    }
  }
};
