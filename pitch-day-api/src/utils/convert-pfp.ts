import { InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';

export async function convertImage(profilePicture: string) {
  const imageRequest = profilePicture.replace(/data:image\/(.*?);base64,/, '');
  const imageBuffer = Buffer.from(imageRequest, 'base64');

  await sharp(imageBuffer)
    .resize(1000, 1000)
    .jpeg({ quality: 80 })
    .toBuffer()
    .then((data) => {
      profilePicture = `data:image/jpeg;base64,${data.toString('base64')}`;
    })
    .catch((err) => {
      throw new InternalServerErrorException(
        `Error to convert profile image: ${err}`,
      );
    });

  return profilePicture;
}
