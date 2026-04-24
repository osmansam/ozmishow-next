import { MetadataRoute } from "next";

/**
 * Generate robots.txt
 * Tells search engines which pages to crawl
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ozmishow.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Block admin and API routes from crawling
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
