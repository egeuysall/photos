import { cloudinary } from './cloudinary';
import type { Photo } from '@/types/general';

interface CloudinaryError {
  message: string;
  stack?: string;
  name?: string;
  code?: string;
  http_code?: number;
}

export async function getCloudinaryPhotos(folder: string = '') {
  console.log(`Fetching photos from: ${folder || 'root level (no folder)'}`);

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      ...(folder && { prefix: folder }),
      max_results: 500,
    });

    if (!result.resources || result.resources.length === 0) {
      console.log(`No images found ${folder ? `in folder: ${folder}` : 'at root level'}`);
      return [];
    }

    const photos = result.resources.map((resource: any, index: number) => ({
      src: cloudinary.url(resource.public_id, {
        width: 800,
        height: 600,
        quality: 'auto:good',
        crop: 'fill',
      }),
      alt: resource.context?.alt || `Photo ${index + 1}`,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
    }));

    console.log(
      `Found ${photos.length} images ${folder ? `in folder: ${folder}` : 'at root level'}`
    );
    return photos;
  } catch (error) {
    const cloudinaryError = error as CloudinaryError;
    console.error('Failed to fetch Cloudinary photos');
    console.error(`Error: ${cloudinaryError.message || 'Unknown error'}`);
    return [];
  }
}

let cachedPhotos: Photo[] | null = null;

export async function getCachedCloudinaryPhotos(folder: string = '') {
  if (cachedPhotos && process.env.NODE_ENV === 'development') {
    return cachedPhotos;
  }

  const photos = await getCloudinaryPhotos(folder);

  if (process.env.NODE_ENV === 'development') {
    cachedPhotos = photos;
  }

  return photos;
}
