import { ChannelType, DMChannel, GuildChannel } from 'discord.js';

export default {
  name: 'channelDelete',
  async execute (channel: DMChannel | GuildChannel) {
    if (channel instanceof DMChannel) {
      return;
    }

    await channel.clone();
  }
};
