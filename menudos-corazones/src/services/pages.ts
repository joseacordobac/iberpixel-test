import { routes } from "./lib";

export const getPostBySlug = async (slug: string) => {
  const endpoint = routes.PAGES + "?slug=" + slug;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching page with slug ${slug}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
