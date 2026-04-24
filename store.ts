/**
 * Mock store for compatibility
 * Provides type definitions used by the original Redux store
 */

export type RootState = {
  context: {
    language: string;
    isAdmin: boolean;
    isSidebarOpen: boolean;
  };
  user: {
    fullName: string;
    email: string;
    role: string;
  };
  pageOptions: any[];
};

export type AppDispatch = (action: any) => any;

export const useAppDispatch = () => (action: any) => {
  console.warn("Mock dispatch called:", action);
  return action;
};

export const useAppSelector = <T = any>(
  selector: (state: RootState) => T,
): T => {
  const mockState: RootState = {
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
  };

  try {
    return selector(mockState);
  } catch {
    return {} as T;
  }
};
