import { routes } from "./lib";

export const getPostBySlug = async (slug: string) => {
  // Add timestamp to bypass WordPress backend caching
  const endpoint = routes.PAGES + "?slug=" + slug + "&t=" + Date.now();
  console.log(`[SSR Fetch] Requesting fresh data from: ${endpoint}`);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error fetching page with slug ${slug}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
