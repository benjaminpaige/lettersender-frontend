import 'dotenv/config';
import { relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: process.env.ENVIRONMENT || 'development',
};

export const MessageImage = list({
  // TODO
  // access:
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    message: relationship({ ref: 'Message.photos' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'message'],
    },
  },
});
