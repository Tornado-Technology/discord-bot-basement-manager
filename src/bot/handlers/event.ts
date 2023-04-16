import { Client } from 'discord.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { ClientEvent } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (client: Client) => {
  const eventsDirectory = join(__dirname, '../events')

  readdirSync(eventsDirectory).forEach((file) => {
    if (!file.endsWith('.js')) {
      return;
    }

    import(`file://${eventsDirectory}/${file}`).then((value) => {
      const event: ClientEvent = value.default;
      event.once = event.once ?? false;
      event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
      console.log(`Successfully loaded event ${event.name}`);
    });
  })
};
