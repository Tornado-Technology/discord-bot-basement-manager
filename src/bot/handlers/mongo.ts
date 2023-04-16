import { Client } from 'discord.js';
import mongoose from 'mongoose';

export default (client: Client) => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('Mongo URI not found, skipping.');
    return;
  }

  mongoose.connect(`${uri}/${process.env.MONGO_DATABASE_NAME}`)
    .then(() => console.log('MongoDB connection has been established.'))
    .catch(() => console.error('MongoDB connection has been failed.'));
};
