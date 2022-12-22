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
      id: '' 
    }));
  }
  
  const rawData = readFileSync(filePath).toString();
  const jsonData = JSON.parse(rawData);

  if (jsonData.id !== data.items[0].id) {
    writeFileSync(filePath, JSON.stringify({
      id: data.items[0].id
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
