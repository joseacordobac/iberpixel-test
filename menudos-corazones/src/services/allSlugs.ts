import { routes } from "./lib";

export const getAllSlugs = async (type: string = "page") => {
  try {
    const response = await fetch(routes.PAGES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching all slugs: ${response.statusText}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map((page: any) => page.slug).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error in getAllSlugs:", error);
    return [];
  }
};
