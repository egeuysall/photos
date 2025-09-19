import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import type { ImageCardProps } from '@/types/general';

export const ImageCard: React.FC<ImageCardProps> = ({ image, imageDesc }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="rounded-md overflow-hidden cursor-pointer hover:opacity-75 ease-in-out transition-opacity duration-200">
          <Image
            src={image}
            alt={imageDesc}
            width={800}
            quality={75}
            height={600}
            className="object-cover"
            priority={false}
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] md:w-auto">
        <AlertDialogHeader>
          <div className="relative w-full flex items-center justify-center rounded-md overflow-hidden mb-2">
            <div className="w-full">
              <Image
                src={image}
                alt={imageDesc}
                width={1200}
                height={900}
                quality={75}
                className="object-contain w-full rounded-md"
                priority={true}
                style={{
                  maxHeight: '60vh',
                  height: '100%',
                  width: '100%',
                  borderRadius: '0.5rem',
                }}
              />
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <AlertDialogAction>Back to gallery</AlertDialogAction>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
