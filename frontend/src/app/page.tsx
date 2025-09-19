import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { fetchLatestBlogs } from '@/hooks/fetch-blogs';
import { BlogCard } from '@/components/blocks/blog-card';
import { ImageCard } from '@/components/blocks/image-card';
import { photos } from '@/lib/photos';
import type { Blog } from '@/types/general';

const Landing: React.FC = async () => {
  const blogs = await fetchLatestBlogs();

  return (
    <main className="flex flex-col gap-18">
      {/* Hero Section */}
      <section className="w-full flex flex-col gap-md">
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
        <div className="flex gap-sm mb-lg">
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
            className="object-cover w-full h-72 md:h-96 lg:h-160 xl:h-192 rounded-md"
            quality={75}
            priority={true}
          />
        </div>
      </section>
      <section className="w-full flex flex-col gap-md">
        <h2>About me</h2>
        <div className="flex flex-col md:flex-row gap-lg">
          <Image
            src="/portrait.jpg"
            alt="Duck Image"
            width={1200}
            height={800}
            className="object-cover aspect-square w-96 rounded-md"
            quality={75}
            priority={true}
          />
          <div className="flex flex-col gap-sm">
            <h3>Ege Uysal</h3>
            <p className="w-full md:w-3/4 lg:w-2/3">
              Hi, I’m Ege, a photographer based in Chicago, USA. I capture the beauty of cars and
              nature, focusing on the details and moments that often go unnoticed. My goal is to
              share my perspective through striking images that tell a story and evoke emotion.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col gap-md">
        <h2>Photos</h2>
        <div
          className="w-full columns-2 md:columns-3 lg:columns-4 gap-md space-y-4
          "
        >
          {photos.map((photo, index) => {
            const rotation = ((index * 26) % 20) - 10;
            return (
              <div
                key={index}
                className="mb-4 break-inside-avoid transition-transform duration-300"
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
      <section className="w-full flex flex-col gap-md">
        <h2>My Blog</h2>
        <ul className="grid lg:grid-cols-3 gap-xl">
          {blogs.length === 0 ? (
            <li className="text-neutral-500">No blog posts found.</li>
          ) : (
            blogs.map((blog: Blog) => (
              <li key={blog.id}>
                <a
                  href={`https://www.blog.egeuysal.com/${blog.slug}`}
                  className="hover:no-underline hover:opacity-75 transition-opacity ease-in-out"
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
