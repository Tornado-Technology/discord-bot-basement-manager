import { Message } from 'discord.js';

export default {
  name: 'messageUpdate',
  async execute (oldMessage: Message, message: Message) {
    const member = message.member;
    if (oldMessage?.content.includes('🍍') || message?.content.includes('🍍')  && !member?.roles.cache.get('1088349504094359572')  && !member?.roles.cache.get('1048590352845635595')) {
      await oldMessage?.delete();
    }
  }
};
