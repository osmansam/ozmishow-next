import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ozmishow - Dynamic Page Builder",
  description: "Schema-driven page builder with SEO support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
