import { redirect } from "next/navigation";

/**
 * Root page - redirects to a default page
 * You can customize this to fetch the homepage from your backend
 */
export default function HomePage() {
  // Option 1: Redirect to a specific page
  redirect("/home");

  // Option 2: Or render a specific page directly
  // return <PageContent page="home" />;
}
