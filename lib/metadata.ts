import { PageOptionsType } from "@/types";
import { Metadata } from "next";

/**
 * Generate Next.js metadata from page data
 */
export function generatePageMetadata(
  pageOptions: PageOptionsType | undefined,
  defaultPage: string = "Home",
): Metadata {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Ozmishow";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ozmishow.com";

  const title = pageOptions?.metadata?.title || `${defaultPage} | ${siteName}`;
  const description =
    pageOptions?.metadata?.description ||
    `Welcome to ${siteName} - Your dynamic page builder`;
  const keywords = pageOptions?.metadata?.keywords || [];
  const ogImage = pageOptions?.metadata?.ogImage || `${siteUrl}/og-image.jpg`;
  const canonical = pageOptions?.metadata?.canonical;
  const robots = pageOptions?.metadata?.robots || "index, follow";

  return {
    title,
    description,
    keywords,
    robots,

    openGraph: {
      title,
      description,
      url: canonical || siteUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
  };
}

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateStructuredData(
  pageOptions: PageOptionsType | undefined,
  pagePath: string,
) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Ozmishow";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ozmishow.com";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageOptions?.metadata?.title || siteName,
    description: pageOptions?.metadata?.description || "",
    url: `${siteUrl}/${pagePath}`,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}
