import { AutocompleteInteraction, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string,
      CLIENT_ID: string,
      PREFIX: string,
      MONGO_URI: string,
      MONGO_DATABASE_NAME: string,
      REST_VERSION: string,
    }
  }
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, SlashCommand>,
    cooldowns: Collection<string, number>,
    protection: boolean,
  }

  export interface CommandInteraction {
    // @ts-ignore
    options: {
      getString(key: string): string
    }
  }
}

export interface ClientEvent {
  name: string,
  once?: boolean | false,
  execute: (args?: any[]) => void
}

export interface SlashCommand {
  command: SlashCommandBuilder | any,
  execute: (interaction : CommandInteraction) => void,
  autocomplete?: (interaction: AutocompleteInteraction) => void,
  cooldown?: number, // In seconds
}
