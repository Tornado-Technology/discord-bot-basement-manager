import {Client, Collection, Events, GatewayIntentBits, Partials, REST, Routes} from 'discord.js';
import {existsSync, readdirSync, writeFileSync, writeSync} from 'fs';
import { checkVideo } from './module/checkVideo.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {loadReactionMessages, saveReactionMessages} from "./module/saveReactionMessages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const token = 'MTA1NDY1Njg3MzE1ODE1MjIxMw.G0g0Sn.p26o4ewnJMFPuOu5yF0WbgDePvAkf94g0_6xkc';
const applicationId = '1054656873158152213';
const restVersion = '10';

const checkInterval = 60_000; // 1 minute
export const reactionMessages = [];

const rest = new REST({ 
  version: restVersion 
}).setToken(token);

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ],
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
  loadReactionMessages();

  setInterval(() => {
    saveReactionMessages();
  }, 10000);

  setInterval(() => {
    //checkVideo(client, 'UCV078E1mCeRS4blwnIlsK-w');
    //checkVideo(client, 'UCaUxByGzCt3E_6znmAYex6w');
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

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (user === client.user) {
    return;
  }

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      return;
    }
  }

  const reactionMessage = reactionMessages.find((message) => {
    return message.serverId === reaction.message.guildId &&
      message.channelId === reaction.message.channelId &&
      message.messageId === reaction.message.id &&
      message.reaction === `<:${reaction.emoji.name}:${reaction.emoji.id}>`
  });

  if (reactionMessage) {
    const member = await reaction.message.guild.members.cache.get(user.id);
    const role = await member.guild.roles.fetch(reactionMessage.roleId);
    await member.roles.add(role);
  }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
  if (user === client.user) {
    return;
  }

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      return;
    }
  }

  const reactionMessage = reactionMessages.find((message) => {
    return message.serverId === reaction.message.guildId &&
      message.channelId === reaction.message.channelId &&
      message.messageId === reaction.message.id &&
      message.reaction === `<:${reaction.emoji.name}:${reaction.emoji.id}>`
  });

  if (reactionMessage) {
    const member = await reaction.message.guild.members.cache.get(user.id);
    const role = await member.guild.roles.fetch(reactionMessage.roleId);
    await member.roles.remove(role);
  }
});

client.login(token).catch(console.error);
