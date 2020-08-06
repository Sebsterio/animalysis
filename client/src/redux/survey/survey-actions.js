// --- Survey data ---

export const SET_SURVEY_DATA = "SET_SURVEY_DATA";
export const setSurveyData = (data) => ({
	type: SET_SURVEY_DATA,
	payload: data,
});

// --- Current location ---

export const SET_ANSWER_IN_CURRENT_LOCATION = "SET_ANSWER_IN_CURRENT_LOCATION";
export const setAnswerInCurrentLocation = (data) => ({
	type: SET_ANSWER_IN_CURRENT_LOCATION,
	payload: data,
});

export const ADD_ANSWER_IN_CURRENT_LOCATION = "ADD_ANSWER_IN_CURRENT_LOCATION";
export const addAnswerInCurrentLocation = (data) => ({
	type: ADD_ANSWER_IN_CURRENT_LOCATION,
	payload: data,
});

// --- Location history ---

export const PUSH_LOCATION_TO_HISTORY = "PUSH_LOCATION_TO_HISTORY";
export const pushLocationToHistory = (data) => ({
	type: PUSH_LOCATION_TO_HISTORY,
	payload: data,
});

export const POP_LOCATION_FROM_HISTORY = "POP_LOCATION_FROM_HISTORY";
export const popLocationFromHistory = () => ({
	type: POP_LOCATION_FROM_HISTORY,
});

// --- Main queue ---

export const SET_QUEUE = "SET_QUEUE";
export const setQueue = (data) => ({
	type: SET_QUEUE,
	payload: data,
});

export const SHIFT_NEXT_LOCATION_FROM_QUEUE = "SHIFT_NEXT_LOCATION_FROM_QUEUE";
export const shiftNextLocationFromQueue = () => ({
	type: SHIFT_NEXT_LOCATION_FROM_QUEUE,
});

export const UNSHIFT_LOCATIONS_TO_QUEUE = "UNSHIFT_LOCATIONS_TO_QUEUE";
export const unshiftLocationsToQueue = (data) => ({
	type: UNSHIFT_LOCATIONS_TO_QUEUE,
	payload: data,
});

export const INJECT_LOCATIONS_TO_QUEUE = "INJECT_LOCATIONS_TO_QUEUE";
export const injectLocationsToQueue = (data) => ({
	type: INJECT_LOCATIONS_TO_QUEUE,
	payload: data,
});

export const PUSH_LOCATIONS_TO_QUEUE = "PUSH_LOCATIONS_TO_QUEUE";
export const pushLocationsToQueue = (data) => ({
	type: PUSH_LOCATIONS_TO_QUEUE,
	payload: data,
});

// --- Optional queue ---

export const SET_OPTIONAL_QUEUE = "SET_OPTIONAL_QUEUE";
export const setOptionalQueue = (data) => ({
	type: SET_OPTIONAL_QUEUE,
	payload: data,
});

export const REMOVE_FROM_OPTIONAL_QUEUE = "REMOVE_FROM_OPTIONAL_QUEUE";
export const removeFromOptionalQueue = (data) => ({
	type: REMOVE_FROM_OPTIONAL_QUEUE,
	payload: data,
});
