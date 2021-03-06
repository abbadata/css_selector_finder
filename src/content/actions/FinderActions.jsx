export const SET_FINDER_ID_ENABLED = "SET_FINDER_ID_ENABLED";
export const SET_FINDER_CLASS_ENABLED = "SET_FINDER_CLASS_ENABLED";
export const SET_FINDER_TAG_ENABLED = "SET_FINDER_TAG_ENABLED";
export const SET_FINDER_ATTRIBUTE_ENABLED = "SET_FINDER_ATTRIBUTE_ENABLED";
export const ADD_FINDER_ID_FILTER = "ADD_FINDER_ID_FILTER";
export const DELETE_FINDER_ID_FILTER = "DELETE_FINDER_ID_FILTER";
export const ADD_FINDER_CLASS_FILTER = "ADD_FINDER_CLASS_FILTER";
export const DELETE_FINDER_CLASS_FILTER = "DELETE_FINDER_CLASS_FILTER";
export const ADD_FINDER_TAG_FILTER = "ADD_FINDER_TAG_FILTER";
export const DELETE_FINDER_TAG_FILTER = "DELETE_FINDER_TAG_FILTER";
export const ADD_FINDER_ATTRIBUTE_FILTER = "ADD_FINDER_ATTRIBUTE_FILTER";
export const DELETE_FINDER_ATTRIBUTE_FILTER = "DELETE_FINDER_ATTRIBUTE_FILTER";

export const SET_FINDER_SEED_MIN_LENGTH = "SET_FINDER_SEED_MIN_LENGTH";
export const SET_FINDER_OPTIMIZED_MIN_LENGTH =
  "SET_FINDER_OPTIMIZED_MIN_LENGTH";
export const SET_FINDER_THRESHHOLD = "SET_FINDER_THRESHHOLD";
export const SET_FINDER_MAX_NUMBER_OF_TRIES = "SET_FINDER_MAX_NUMBER_OF_TRIES";

export function generateHighlyOptimizedSelector() {
  return (dispatch, getState) => {
    dispatch({ type: "SET_FINDER_OPTIMIZED", payload: { value: "" } });
    dispatch({ type: "SET_FINDER_MAX", payload: { value: "" } });
    dispatch({ type: "GENERATE" });
  };
}
