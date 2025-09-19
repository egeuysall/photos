export async function fetchLatestBlogs() {
  try {
    const res = await fetch('https://blogapi.egeuysal.com:8443/v1/blogs?limit=3', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Error Status Code: ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
    return [];
  }
}
