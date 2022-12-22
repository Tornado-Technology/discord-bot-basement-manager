import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('соник')
    .setDescription('Ты опоздпл!'),
  async execute(interaction) {
    await interaction.reply('Ты опоздал соник! Теперь я серфецированный игни!');
  },
}
