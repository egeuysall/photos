// Cloudinary configuration and utility functions
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using URL format
const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (cloudinaryUrl) {
  cloudinary.config(cloudinaryUrl);
} else {
  // Fallback to individual environment variables
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function getCloudinaryImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    crop?: string;
    gravity?: string;
  } = {}
) {
  const {
    width = 1200,
    height = 800,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    format,
    crop,
    gravity,
    secure: true,
  });
}

export function getCloudinaryImageUrlForPhotos(publicId: string) {
  return getCloudinaryImageUrl(publicId, {
    width: 800,
    height: 600,
    quality: 'auto:good',
    crop: 'fill',
  });
}

export { cloudinary };
