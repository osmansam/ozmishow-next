/**
 * React Redux compatibility shim for Next.js
 * Provides mock implementations of Redux hooks for compatibility
 *
 * Note: This is a temporary solution. Proper implementation would use:
 * - Zustand, Jotai, or React Context for state management
 * - Server Components where possible
 * - Next.js App Router for navigation
 */

"use client";

/**
 * useSelector - mock implementation
 * Returns an empty object/default values to prevent crashes
 * TODO: Implement actual state management
 */
export function useSelector<T = any>(selector: (state: any) => T): T {
  // Return mock data based on common selectors
  const mockState = {
    context: {
      language: "en",
      isAdmin: false,
      isSidebarOpen: false,
    },
    user: {
      fullName: "",
      email: "",
      role: "user",
    },
    pageOptions: [],
    twoPicture: {
      twoPictureArray: [],
      containers: [],
      loading: false,
      error: null,
    },
  };

  try {
    return selector(mockState);
  } catch {
    return {} as T;
  }
}

/**
 * useDispatch - mock implementation
 * Returns a no-op function to prevent crashes
 * TODO: Implement actual state management
 */
export function useDispatch() {
  return (action: any) => {
    console.warn("Redux dispatch called in compatibility mode:", action);
    return action;
  };
}

/**
 * Provider - mock Provider component
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * connect - mock connect function
 */
export function connect() {
  return (component: any) => component;
}
