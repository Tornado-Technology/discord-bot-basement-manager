import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {reactionMessages} from '../index.js';
import {ReactionMessage} from "../reactionMessage.js";

const root = dirname(fileURLToPath(import.meta.url));
const filePath = `${root}/../data/reactions.json`;

export const saveReactionMessages = () => {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify({
      reactionsMessages: []
    }));
  }

  writeFileSync(filePath, JSON.stringify({
    reactionMessages,
  }));
}

export const loadReactionMessages = () => {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify({
      reactionsMessages: []
    }));
  }

  const data = JSON.parse(readFileSync(filePath).toString())?.reactionsMessages ?? [];
  data.forEach((reactionMessage) => {
    reactionMessages.push(new ReactionMessage(reactionMessage.serverId, reactionMessage.channelId, reactionMessage.messageId, reactionMessage.reaction, reactionMessage.roleId));
  });
}
