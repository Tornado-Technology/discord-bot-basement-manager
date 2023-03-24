import mongoose, { model, Schema } from 'mongoose';

export interface IUserBan extends mongoose.Document {
  guildId: string,
  partial: boolean,
  reason: string,
  userId: string,
  moderatorId: string,
  date: Date,
}

const UserBanSchema = new Schema<IUserBan>({
  guildId: { type: String, required: true, },
  partial: { type: Boolean, required: true, },
  reason: { type: String, required: false, },
  userId: { type: String, required: true, },
  moderatorId: { type: String, required: true, },
  date: { type: Date, default: Date.now },
}, {
  collection: 'userBans',
});

const UserBanModel = model('userBan', UserBanSchema)
export { UserBanModel };
