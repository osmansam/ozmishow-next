import { getAllPages } from "@/lib/api-client";
import { getBaseUrl } from "@/lib/utils";
import { MetadataRoute } from "next";

/**
 * Generate dynamic sitemap from backend data
 * This is automatically called by Next.js
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  try {
    const pages = await getAllPages();

    return pages.map((page) => ({
      url: `${baseUrl}/${page.pageNameEN.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.pageNameEN.toLowerCase() === "home" ? 1.0 : 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback sitemap with just homepage
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }
}
