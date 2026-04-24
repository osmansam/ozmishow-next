import SchemaRenderer from "@/components/SchemaRenderer";
import { getPageData } from "@/lib/api-client";
import { generatePageMetadata, generateStructuredData } from "@/lib/metadata";
import { filterByLanguage, sortByPosition } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

/**
 * Generate metadata for SEO
 * This runs at build time for SSG or request time for SSR
 */
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { lang } = await searchParams;
    const language = lang || "en";
    const pageData = await getPageData(slug, language);

    return generatePageMetadata(pageData.pageOptions, slug);
  } catch (error) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}

/**
 * Dynamic Page Component
 * Fetches data from Go backend and renders components based on schema
 */
export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = lang || "en";

  console.log(`[PAGE] Loading page: ${slug}, language: ${language}`);

  let pageData;
  try {
    pageData = await getPageData(slug, language);
    console.log("[PAGE] Received pageData:", pageData);
  } catch (error) {
    console.error("[PAGE] Error loading page data:", error);
    notFound();
  }

  if (!pageData || !pageData.pageOptions) {
    console.error("[PAGE] No page data or page options:", { pageData });
    notFound();
  }

  const { pageOptions, containers } = pageData;
  console.log("[PAGE] Page options:", pageOptions);
  console.log("[PAGE] Raw containers:", containers);
  console.log("[PAGE] Containers count:", containers?.length || 0);

  // Filter and sort containers by language and position
  const filteredContainers = filterByLanguage(containers, language);
  const sortedContainers = sortByPosition(filteredContainers);

  console.log("[PAGE] Filtered containers:", filteredContainers);
  console.log("[PAGE] Sorted containers:", sortedContainers);
  console.log("[PAGE] Final containers count:", sortedContainers?.length || 0);

  // Generate structured data for SEO
  const structuredData = generateStructuredData(pageOptions, slug);

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Page Content */}
      <main
        className="flex flex-col min-h-screen"
        style={pageOptions.pageStyle}
      >
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <SchemaRenderer containers={sortedContainers} page={slug} />
        </Suspense>
      </main>
    </>
  );
}

/**
 * Optional: Enable Static Site Generation for known pages
 * Uncomment and implement if you want to pre-render pages at build time
 */
// export async function generateStaticParams() {
//   const pages = await getAllPages();
//
//   return pages.map((page) => ({
//     slug: page.pageNameEN.toLowerCase(),
//   }));
// }

/**
 * Revalidation strategy
 * - false: SSG with no revalidation (fully static)
 * - number (e.g., 60): ISR - revalidate every N seconds
 * - 0 or undefined: SSR - fetch on every request
 */
export const revalidate = 60; // ISR: Revalidate every 60 seconds
