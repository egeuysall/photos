import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import type { ImageCardProps } from '@/types/general';

export const ImageCard: React.FC<ImageCardProps> = ({ image, imageDesc }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full cursor-pointer overflow-hidden rounded-md transition-opacity duration-200 ease-in-out hover:opacity-75">
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
        <AlertDialogTitle>{imageDesc}</AlertDialogTitle>
        <AlertDialogHeader>
          <div className="relative mb-2 flex w-full items-center justify-center overflow-hidden rounded-md">
            <div className="w-full">
              <Image
                src={image}
                alt={imageDesc}
                width={1200}
                height={900}
                quality={75}
                className="w-full rounded-md object-contain"
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
          <div className="mt-2 flex justify-center">
            <AlertDialogAction>Back to gallery</AlertDialogAction>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
