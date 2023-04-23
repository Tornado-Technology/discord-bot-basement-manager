import { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder } from 'discord.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsDirname = `${__dirname}/../../../assets`

const imageSuccessful = await loadImage(`${assetsDirname}/successfulVerification.png`)

const canvas = createCanvas(500, 200);
const context = canvas.getContext('2d');
context.textAlign = 'center';

export const fillBackground = (color: string) => {
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const fillMainText = (text: string, x: number, y: number) => {
  context.font = '30px Impact';
  context.fillStyle = '#000000';
  context.fillText(text, x, y);
};

export const fillSubText = (text: string, x: number, y: number) => {
  context.font = '20px Impact';
  context.fillStyle = '#797979';
  context.fillText(text, x, y);
};

export const generateAttachment = (): AttachmentBuilder => {
  return new AttachmentBuilder(canvas.toBuffer('image/png'), {
    name: 'image.png'
  });
};

export const createImage = (main: string, sub: string): AttachmentBuilder => {
  fillBackground('#ffffff');
  fillMainText(main, canvas.width / 2, canvas.height / 2);
  fillSubText(sub, canvas.width / 2, canvas.height / 2 + 30);
  return generateAttachment();
};

export const createVerificationImage = (): AttachmentBuilder => {
  return createImage('ВЕРИФИКАЦИЯ', 'Пройдите опрос ниже');
};

export const createWrongImage = (): AttachmentBuilder => {
  return createImage('Вы гений', '🐡');
};

export const createsSuccessfulImage = (): AttachmentBuilder => {
  context.drawImage(imageSuccessful, 0, 0, canvas.width, canvas.height);
  return generateAttachment();
};