// @ts-ignore
import Parser from 'rss-parser';
import { Client, NewsChannel, TextChannel } from 'discord.js';
import { IYoutubeNotification, YoutubeNotificationModel } from '../schemas/youtubeNotification.js';

const parser = new Parser();
interface IVideoInfo {
  id: string,
  title: string,
  author: string,
  link: string,
}

const checkVideo = (client: Client, notification: IYoutubeNotification) => {
  parser.parseURL(`https://youtube.com/feeds/videos.xml?channel_id=${notification.youtubeId}`).then((data: any) => {
    try {
      if (!data || !data.items || data.items.length === 0 || !data.items[0].id) {
        return;
      }

      // @ts-ignore
      const videos: IVideoInfo[] = data.items;
      const videoId = videos[0].id;

      if (notification.lastVideos.includes(videoId)) {
        return;
      }

      notification.lastVideos.push(videoId);
      notification.save().then(() => {
        client.guilds.fetch(notification.guildId).then((guild) => {
          guild.channels.fetch(notification.channelId).then((channel) => {
            // @ts-ignore
            const videoInfo: IVideoInfo = data.items[0];
            if (!videoInfo) {
              return;
            }

            let message: string = notification.message;
            message = message.replace(/%title/, videoInfo.title);
            message = message.replace(/%author/, videoInfo.author);
            message = message.replace(/%link/, videoInfo.link);

            if (channel instanceof TextChannel || channel instanceof NewsChannel) {
              channel?.send(message);
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
}

export default (client: Client) => {
  const timer = () => {
    YoutubeNotificationModel.find().then((notifications) => {
      for (const notification of notifications) {
        checkVideo(client, notification);
      }
      setTimeout(timer, 15000);
    });
  }
  setTimeout(timer, 15000);
}
