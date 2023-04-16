import { Message } from 'discord.js';

export default {
  name: 'messageCreate',
  async execute (message: Message) {
    const member = message.member;
    if (message.content.includes('🍍') && !member?.roles.cache.get('1088349504094359572')  && !member?.roles.cache.get('1048590352845635595')) {
      await message.delete();
    }
  }
};
