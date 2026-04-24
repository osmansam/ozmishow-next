/**
 * Mock userSlice for compatibility
 */

// Action creators
export const logout = () => ({ type: "LOGOUT" });
export const login = (payload: any) => ({ type: "LOGIN", payload });
export const setUser = (payload: any) => ({ type: "SET_USER", payload });
