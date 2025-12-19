import type { Photo } from '@/types/general';
import { getCachedCloudinaryPhotos } from './get-cloudinary-photos';

async function fetchPhotos(): Promise<Photo[]> {
  try {
    const photos = await getCachedCloudinaryPhotos('photos');

    if (photos.length === 0) {
      console.log('No photos found in Cloudinary "photos" folder.');
      console.log('Please check your Cloudinary credentials and folder name.');
    } else {
      console.log(`Successfully loaded ${photos.length} photos from Cloudinary`);
    }

    return photos;
  } catch (error) {
    console.error('Failed to load Cloudinary photos:', error);
    return [];
  }
}

export const photos: Photo[] = [];

fetchPhotos().then(fetchedPhotos => {
  if (process.env.NODE_ENV === 'development') {
    photos.length = 0;
    photos.push(...fetchedPhotos);
  }
});

if (process.env.NODE_ENV !== 'development') {
  console.log('For production, consider pre-fetching Cloudinary photos during build');
}
