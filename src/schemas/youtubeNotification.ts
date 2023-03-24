import mongoose, { model, Schema } from 'mongoose';

export interface IYoutubeNotification extends mongoose.Document {
  guildId: string,
  channelId: string,
  youtubeId: string,
  message: string,
  lastVideo: string,
}

const YoutubeNotificationSchema = new Schema<IYoutubeNotification>({
  guildId: { type: String, required: true, },
  channelId: { type: String, required: true, },
  youtubeId: { type: String, required: true, },
  message: { type: String, default: 'На канале **%author** вышел новый ролик **%title**: *%link*', },
  lastVideo: { type: String, default: null, },
}, {
  collection: 'youtubeNotifications',
});

const YoutubeNotificationModel = model('youtubeNotification', YoutubeNotificationSchema)
export { YoutubeNotificationModel };
