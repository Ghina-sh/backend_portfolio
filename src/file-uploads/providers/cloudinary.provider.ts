import { v2 } from 'cloudinary';
// import { cloudinaryConfig } from 'src/cloudinary.config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
