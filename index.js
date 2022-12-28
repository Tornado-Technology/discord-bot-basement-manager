import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { checkVideo } from './module/checkVideo.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const token = 'MTA1NDY1Njg3MzE1ODE1MjIxMw.Ggqgnw.iLG29_pG02K4AE7jpnpBpIzaXZ3XHKLlinD7-U';
const applicationId = '1054656873158152213';
const restVersion = '10';

const checkInterval = 60_000; // 1 minute

const rest = new REST({ 
  version: restVersion 
}).setToken(token);

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ] 
});
client.commands = new Collection();

const path = `${__dirname}/commands/`;
readdirSync(path, 'utf8').forEach((file) => {
  import(`file://${path}/${file}`).then((value) => {
    client.commands.set(value.default.data.name, value.default);
  });
});

client.once(Events.ClientReady, async () => {
  console.log(`Bot started as ${client.user.tag}.`);

  await (async () => {
    const commands = [];
    Array.from(client.commands.values()).forEach((value) => {
      commands.push(value.data.toJSON());
    });
  
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);
  
      const data = await rest.put(Routes.applicationCommands(applicationId), { 
        body: commands 
      });
  
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  })();  

  setInterval(() => {
    checkVideo(client, 'UCV078E1mCeRS4blwnIlsK-w');
    checkVideo(client, 'UCaUxByGzCt3E_6znmAYex6w');
  }, checkInterval);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  }
});

client.login(token);
