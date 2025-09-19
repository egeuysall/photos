import type { Blog } from '@/types/general';

export const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => (
  <div className="flex flex-col gap-sm border-none">
    {blog.cover_link && (
      <img
        src={blog.cover_link}
        alt={blog.title}
        className="w-full h-64 rounded-md aspect-video object-cover"
      />
    )}
    <div className="flex flex-col gap-3xs">
      <span className="font-semibold text-neutral-900 dark:text-neutral-100">{blog.title}</span>
      <span className="text-small text-neutral-500">
        By {blog.created_by} &bull; {new Date(blog.created_at).toLocaleDateString()}
      </span>
    </div>
  </div>
);
