import mongoose, { model, Schema } from 'mongoose';

export interface IReactionMessage extends mongoose.Document {
  guildId: string,
  channelId: string,
  messageId: string,
  reaction: string,
  roleId: string,
}

const ReactionMessageSchema = new Schema<IReactionMessage>({
  guildId: { type: String, required: true, },
  channelId: { type: String, required: true, },
  messageId: { type: String, required: true, },
  reaction: { type: String, required: true, },
  roleId: { type: String, required: true, },
}, {
  collection: 'reactionMessages',
});

const ReactionMessageModel = model('reactionMessage', ReactionMessageSchema)
export { ReactionMessageModel };
