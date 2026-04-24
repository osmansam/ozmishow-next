/**
 * Mock contextSlice for compatibility
 * These are no-op functions to prevent crashes during migration
 */

// Action creators
export const setIsAdmin = (payload: boolean) => ({
  type: "SET_IS_ADMIN",
  payload,
});
export const setIsSidebarOpen = (payload: boolean) => ({
  type: "SET_IS_SIDEBAR_OPEN",
  payload,
});
export const setLanguage = (payload: string) => ({
  type: "SET_LANGUAGE",
  payload,
});
export const setSelectedSection = (payload: any) => ({
  type: "SET_SELECTED_SECTION",
  payload,
});
