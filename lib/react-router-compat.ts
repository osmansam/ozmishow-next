/**
 * React Router DOM compatibility shim for Next.js
 * This file provides drop-in replacements for react-router-dom hooks
 * to make migrated components work in Next.js without major refactoring
 */

"use client";

import {
  useParams as useNextParams,
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

/**
 * useNavigate - navigation hook compatible with react-router-dom
 * Returns a function to navigate programmatically
 */
export function useNavigate() {
  const router = useNextRouter();

  return (
    to: string | number,
    options?: { replace?: boolean; state?: any },
  ) => {
    if (typeof to === "number") {
      // Handle navigate(-1), navigate(1), etc.
      if (to === -1) {
        router.back();
      } else if (to === 1) {
        router.forward();
      }
    } else {
      // Handle navigate('/path')
      if (options?.replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    }
  };
}

/**
 * useParams - get URL parameters
 * Compatible with react-router-dom's useParams
 */
export function useParams<T = any>(): Partial<T> {
  return useNextParams() as Partial<T>;
}

/**
 * useLocation - get current location
 * Simplified version compatible with react-router-dom
 */
export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    pathname,
    search: searchParams?.toString() ? `?${searchParams.toString()}` : "",
    hash: typeof window !== "undefined" ? window.location.hash : "",
    state: null,
    key: "default",
  };
}

/**
 * useSearchParams - work with URL search parameters
 * This is already provided by Next.js, just re-export it
 */
export { useSearchParams } from "next/navigation";

/**
 * Link component - drop-in replacement for react-router-dom's Link
 */
export { default as Link } from "next/link";

/**
 * useRouter - expose Next.js router
 */
export function useRouter() {
  return useNextRouter();
}
