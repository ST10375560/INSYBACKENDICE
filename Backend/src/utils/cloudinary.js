import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dzkz6h3m1',
  api_key: process.env.CLOUDINARY_API_KEY || '874437187592737',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'pX4bX1q8nY3k3b7e9nUu6K3c0mM',
});

export default cloudinary;
