import {
  ActionRowBuilder, AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Interaction,
  NewsChannel,
  TextChannel,
} from 'discord.js';
import { reviewId } from '../modals/review.js';
import { techSupportModalId } from '../modals/techSupport.js';
import {createCanvas} from "canvas";

const isNumeric = (str: string): boolean => !isNaN(parseInt(str));
const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

export default {
  name: 'interactionCreate',
  async execute (interaction: Interaction) {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.member) {
      console.error('Interaction member not found!');
      return;
    }

    const guild = interaction.guild;
    if (!guild) {
      console.error('Interaction guild not found!');
      return;
    }

    const member = await guild.members.fetch(interaction.member.user.id);
    if (!member) {
      console.error(`Member ${interaction.member.user.username} not found!`);
      return;
    }

    const nickname = (await member).displayName ?? '';
    const url = (await member).displayAvatarURL() ?? '';
    let embed;

    switch (interaction.customId) {
      case reviewId.modal:
        const value = interaction.fields.getTextInputValue(reviewId.evaluationInput);
        const evaluation = isNumeric(value) ? clamp(parseInt(value), 0, 10) : 10;

        const canvas = createCanvas(200, 200);
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.font = '75px Impact';
        context.fillStyle = '#000000';
        context.fillText(`${evaluation}/10`, canvas.width / 2, canvas.height / 2 + 23);

        const attachments = new AttachmentBuilder(canvas.toBuffer('image/png'), {
          name: 'image.png'
        });

        embed = new EmbedBuilder()
          .setThumbnail('attachment://image.png')
          .setAuthor({ name: nickname, iconURL: url })
          .setDescription(`**Мнение:**\n\`\`\`${interaction.fields.getTextInputValue(reviewId.opinionInput)}\`\`\`\n**Улучшение:**\`\`\`${interaction.fields.getTextInputValue(reviewId.upgradeInput)}\`\`\``);

        await interaction.reply({
          files: [attachments],
          embeds: [embed],
          fetchReply: true,
          // @ts-ignore
          components: [new ActionRowBuilder().addComponents([
              new ButtonBuilder({
                customId: 'createReview',
                emoji: '➕',
                style: ButtonStyle.Secondary,
              })
            ])
          ],
        });
        break;

      case techSupportModalId.modal:
        embed = new EmbedBuilder()
          .setAuthor({ name: nickname, iconURL: url })
          .setDescription(`**Сообщение:**\n\`\`\`${interaction.fields.getTextInputValue(techSupportModalId.messageInput)}\`\`\``);

        const channel = await guild.channels.fetch('1099562517778411612');
        if (channel instanceof TextChannel || channel instanceof NewsChannel) {
          await channel.send({
            embeds: [embed],
          });
        }

        await interaction.reply({
          ephemeral: true,
          content: 'Ваш запрос был успешно отправлен!',
          fetchReply: true,
        });
        break;
    }
  }
};
