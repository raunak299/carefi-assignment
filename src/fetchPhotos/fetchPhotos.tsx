export const fetchPhotos = async (url: string) => {
  const response = await fetch(url);
  const { total, total_pages, results } = await response.json();
  return { total, total_pages, results };
};

export const fetchPhotoDetails = async (url: string) => {
  const response = await fetch(url);
  const { description, downloads, likes, user } = await response.json();
  return { description, downloads, likes, user };
};
