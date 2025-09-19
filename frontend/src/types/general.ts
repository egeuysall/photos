export type Photo = {
  src: string;
  alt: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  cover_link?: string;
  created_by: string;
  created_at: string;
};
