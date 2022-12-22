import Parser from 'rss-parser';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));
const parser = new Parser();

const guildId = '1047612274673729596'
const channelId = '1054674392203935754';

export const checkVideo = async(client, yotubeId) => {
  const data = await parser.parseURL(`https://youtube.com/feeds/videos.xml?channel_id=${yotubeId}`).catch(console.error);
  const filePath = `${root}/../data/video_${yotubeId}.json`;

  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify({
      id: [] 
    }));
  }
  
  const rawData = readFileSync(filePath).toString();
  const jsonData = JSON.parse(rawData);

  const videoId = data.items[0].id;
  if (!jsonData.id.includes(videoId)) {
    jsonData.id.push(videoId);
    writeFileSync(filePath, JSON.stringify({
      id: jsonData.id
    }));

    const guild = await client.guilds
      .fetch(guildId)
      .catch(console.error);

    const channel = await guild.channels
      .fetch(channelId)
      .catch(console.error);  

    const { title, link, author } = data.items[0];
    await channel.send(`<@&1053793176277745764> на канале **${author}** вышел новый ролик **${title}**: *${link}*`).catch(console.error);
  }
}
