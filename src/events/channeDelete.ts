import { ChannelType, DMChannel, GuildChannel } from 'discord.js';
import client from '../index.js';

export default {
  name: 'channelDelete',
  async execute (channel: DMChannel | GuildChannel) {
    if (channel instanceof DMChannel || !client.protection) {
      return;
    }
    await channel.clone();
  }
};
