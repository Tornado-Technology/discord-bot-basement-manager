import {CommandInteraction, PermissionFlagsBits, SlashCommandBuilder} from 'discord.js';
import { createCaptchaButtons } from '../buttons/captcha.js';
import { createVerificationImage } from '../utilities/drawCaptcha.js';

export default {
  cooldown: 60,
  command: new SlashCommandBuilder()
    .setName('create_captcha')
    .setDescription('Create captcha.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async function (interaction: CommandInteraction) {
    await interaction.channel?.send({
      // @ts-ignore
      components: [createCaptchaButtons()],
      files: [createVerificationImage()],
      fetchReply: true,
    });

    await interaction.reply({
      ephemeral: true,
      content: 'Капча успешно создана!',
    });
  },
};
