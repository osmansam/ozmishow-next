/**
 * Mock twoPictureSlice for compatibility
 * These are no-op functions to prevent crashes during migration
 */

// Action creators (no-op)
export const setTwoPictureArray = (payload: any) => ({
  type: "SET_TWO_PICTURE_ARRAY",
  payload,
});
export const resetTwoPictureArray = () => ({ type: "RESET_TWO_PICTURE_ARRAY" });
export const updateContainer = (payload: any) => ({
  type: "UPDATE_CONTAINER",
  payload,
});
export const getPageTwoPictures = (payload: any) => ({
  type: "GET_PAGE_TWO_PICTURES",
  payload,
});
export const deletePage = (payload: any) => ({ type: "DELETE_PAGE", payload });
export const getNavbar = () => ({ type: "GET_NAVBAR" });
export const deleteItemInContainer = (payload: any) => ({
  type: "DELETE_ITEM_IN_CONTAINER",
  payload,
});
export const createMap = (payload: any) => ({ type: "CREATE_MAP", payload });
export const getMap = (payload: any) => ({ type: "GET_MAP", payload });
export const getFooter = () => ({ type: "GET_FOOTER" });
export const createFooter = (payload: any) => ({
  type: "CREATE_FOOTER",
  payload,
});
export const updateSlider = (payload: any) => ({
  type: "UPDATE_SLIDER",
  payload,
});
export const editComponentStyle = (payload: any) => ({
  type: "EDIT_COMPONENT_STYLE",
  payload,
});
export const editExplanationBar = (payload: any) => ({
  type: "EDIT_EXPLANATION_BAR",
  payload,
});
export const editWorkTeamBar = (payload: any) => ({
  type: "EDIT_WORK_TEAM_BAR",
  payload,
});
export const editTwoPictureStyle = (payload: any) => ({
  type: "EDIT_TWO_PICTURE_STYLE",
  payload,
});
export const editTwoPictureIndexStyle = (payload: any) => ({
  type: "EDIT_TWO_PICTURE_INDEX_STYLE",
  payload,
});
export const editMainMainHeader = (payload: any) => ({
  type: "EDIT_MAIN_MAIN_HEADER",
  payload,
});
export const editTwoPictureBar = (payload: any) => ({
  type: "EDIT_TWO_PICTURE_BAR",
  payload,
});
export const deleteSlider = (payload: any) => ({
  type: "DELETE_SLIDER",
  payload,
});
export const editPageOptions = (payload: any) => ({
  type: "EDIT_PAGE_OPTIONS",
  payload,
});
export const editResumeBox = (payload: any) => ({
  type: "EDIT_RESUME_BOX",
  payload,
});
export const updateExplanationBar = (payload: any) => ({
  type: "UPDATE_EXPLANATION_BAR",
  payload,
});
export const updateProgressBar = (payload: any) => ({
  type: "UPDATE_PROGRESS_BAR",
  payload,
});
export const updateResumeBox = (payload: any) => ({
  type: "UPDATE_RESUME_BOX",
  payload,
});
export const updateWorkTeamBar = (payload: any) => ({
  type: "UPDATE_WORK_TEAM_BAR",
  payload,
});

// Thunks (async no-ops)
export const fetchTwoPictures = () => async () => {};
export const deleteTwoPicture = () => async () => {};
export const updateTwoPicture = () => async () => {};
