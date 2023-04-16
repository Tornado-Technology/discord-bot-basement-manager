import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { SlashCommand } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async (client: Client): Promise<void> => {
  const commands: SlashCommandBuilder[] = [];
  const directory = join(__dirname, '../commands');

  for (const file of readdirSync(directory)) {
    if (!file.endsWith('.js')) {
      continue;
    }

    const value = await import(`file://${directory}/${file}`);
    const command: SlashCommand = value.default;
    commands.push(command.command);
    client.commands.set(command.command.name, command);
  }

  const rest = new REST({
    version: process.env.REST_VERSION,
  }).setToken(process.env.TOKEN);

  rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands.map((command) => command.toJSON())
  }).then((data: any) => {
    console.log(`Successfully loaded ${data.length} slash command(s)`);
  }).catch((error: Error) => {
    console.error(error);
  });
};
