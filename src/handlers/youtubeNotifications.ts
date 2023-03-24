// @ts-ignore
import Parser from 'rss-parser';
import { Client, TextChannel } from 'discord.js';
import { YoutubeNotificationModel } from '../schemas/youtubeNotification.js';

const parser = new Parser();
interface IVideoInfo {
  id: string,
  title: string,
  author: string,
  link: string,
}

export default (client: Client) => {
  setInterval(async () => {
    for await (const notification of YoutubeNotificationModel.find()) {
      try {
        const data = await parser.parseURL(`https://youtube.com/feeds/videos.xml?channel_id=${notification.youtubeId}`).catch(console.error);
        if (!data || !data.items || data.items.length === 0 || !data.items[0].id) {
          return;
        }

        // @ts-ignore
        const videos: IVideoInfo[] = data.items;
        const videoId = videos[0].id;

        if (notification.lastVideo === videoId) {
          return;
        }

        notification.lastVideo = videoId;
        await notification.save();

        await client.guilds.fetch(notification.guildId).then(async (guild) => {
          await guild.channels.fetch(notification.channelId).then(async (channel) => {
            // @ts-ignore
            const videoInfo: IVideoInfo = data.items[0];
            if (!videoInfo) {
              return;
            }

            let message: string = notification.message;
            message = message.replace(/%title/, videoInfo.title);
            message = message.replace(/%author/, videoInfo.author);
            message = message.replace(/%link/, videoInfo.link);

            if (channel instanceof TextChannel) {
              await channel?.send(message);
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, 15000);
}
