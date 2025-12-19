import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { fetchLatestBlogs } from '@/hooks/fetch-blogs';
import { BlogCard } from '@/components/blocks/blog-card';
import { ImageCard } from '@/components/blocks/image-card';
import { getCachedCloudinaryPhotos } from '@/lib/get-cloudinary-photos';
import type { Blog, Photo } from '@/types/general';

const Landing: React.FC = async () => {
  const blogs = await fetchLatestBlogs();
  const photos: Photo[] = await getCachedCloudinaryPhotos();

  return (
    <main className="flex flex-col gap-18">
      {/* Hero Section */}
      <section className="gap-md flex w-full flex-col">
        <div>
          <h1>
            Hi, I’m Ege!
            <br />
            Chicago and beyond.
          </h1>
          <p className="text-neutral-700 dark:text-neutral-300">
            Capturing the world through my eyes, one frame at a time.
          </p>
        </div>
        <div className="gap-sm mb-lg flex">
          <Link href="#work">
            <Button>See my work</Button>
          </Link>
          <Link href="mailto:hi@egeuysal.com">
            <Button variant="outline">Contact me</Button>
          </Link>
        </div>
        <div className="w-full">
          <Image
            src="/images/duck.jpg"
            alt="Duck Image"
            width={1200}
            height={800}
            className="h-72 w-full rounded-md object-cover md:h-96 lg:h-128 xl:h-160"
            quality={75}
            priority={true}
          />
        </div>
      </section>
      <section className="gap-md flex w-full flex-col">
        <h2>About me</h2>
        <div className="gap-lg flex flex-col md:flex-row">
          <Image
            src="/portrait.jpg"
            alt="Ege Uysal Portrait"
            width={1200}
            height={800}
            className="w-full rounded-md object-cover md:aspect-square md:w-96"
            quality={75}
            priority={true}
          />
          <div className="gap-sm flex flex-col">
            <h3>Ege Uysal</h3>
            <p className="w-full md:w-3/4 lg:w-2/3">
              Hi, I’m Ege, a photographer based in Chicago, USA. I capture the beauty of cars and
              nature, focusing on the details and moments that often go unnoticed. My goal is to
              share my perspective through striking images that tell a story and evoke emotion.
            </p>
          </div>
        </div>
      </section>
      <section className="gap-md flex w-full flex-col" id="work">
        <h2>Photos</h2>
        <div className="gap-md w-full columns-2 space-y-4 md:columns-3">
          {photos.map((photo, index) => {
            const rotation = ((index * 26) % 20) - 10;
            return (
              <div
                key={index}
                className="mb-4 w-full break-inside-avoid transition-transform duration-300"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <ImageCard image={photo.src} imageDesc={photo.alt} />
              </div>
            );
          })}
        </div>
      </section>
      <section className="gap-md flex w-full flex-col">
        <h2>My Blog</h2>
        <ul className="gap-xl grid lg:grid-cols-3">
          {blogs.length === 0 ? (
            <li className="text-neutral-500">No blog posts found.</li>
          ) : (
            blogs.map((blog: Blog) => (
              <li key={blog.id}>
                <a
                  href={`https://www.blog.egeuysal.com/${blog.slug}`}
                  className="transition-opacity ease-in-out hover:no-underline hover:opacity-75"
                >
                  <BlogCard blog={blog} />
                </a>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
};

export default Landing;
