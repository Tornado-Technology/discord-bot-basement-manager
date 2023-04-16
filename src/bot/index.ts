import { Client, Partials, GatewayIntentBits, Collection, PermissionFlagsBits } from 'discord.js';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { config } from 'dotenv';
import { join } from 'path';
import { SlashCommand } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ],
});

client.protection = true;
client.commands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();

const handlersDirectory = join(__dirname, './handlers');
readdirSync(handlersDirectory).forEach((handler) => {
  if (!handler.endsWith('.js')) {
    return;
  }

  import(`file://${handlersDirectory}/${handler}`).then(value => value.default(client));
});

client.login(process.env.TOKEN).then(() => {
  console.log(`Started client: ${client.user?.tag}`)
});

export default client;
