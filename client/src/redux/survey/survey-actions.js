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

export const REMOVE_ANSWER_FROM_CURRENT_LOCATION =
	"REMOVE_ANSWER_FROM_CURRENT_LOCATION";
export const removeAnswerFromCurrentLocation = (data) => ({
	type: REMOVE_ANSWER_FROM_CURRENT_LOCATION,
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

export const REMOVE_LOCATIONS_FROM_QUEUE = "REMOVE_LOCATIONS_FROM_QUEUE";
export const removeLocationsFromQueue = (data) => ({
	type: REMOVE_LOCATIONS_FROM_QUEUE,
	payload: data,
});

// --- Optional queue ---

export const SET_OPTIONAL_QUEUE = "SET_OPTIONAL_QUEUE";
export const setOptionalQueue = (data) => ({
	type: SET_OPTIONAL_QUEUE,
	payload: data,
});

export const SET_INITIAL_OPTIONAL_QUEUE = "SET_INITIAL_OPTIONAL_QUEUE";
export const setInitialOptionalQueue = (data) => ({
	type: SET_INITIAL_OPTIONAL_QUEUE,
	payload: data,
});

export const ADD_TO_OPTIONAL_QUEUE = "ADD_TO_OPTIONAL_QUEUE";
export const addToOptionalQueue = (data) => ({
	type: ADD_TO_OPTIONAL_QUEUE,
	payload: data,
});

export const REMOVE_FROM_OPTIONAL_QUEUE = "REMOVE_FROM_OPTIONAL_QUEUE";
export const removeFromOptionalQueue = (data) => ({
	type: REMOVE_FROM_OPTIONAL_QUEUE,
	payload: data,
});

// --- Alert ---

export const SET_CURRENT_ALERT = "SET_CURRENT_ALERT";
export const setCurrentAlert = (data) => ({
	type: SET_CURRENT_ALERT,
	payload: data,
});

export const SET_INITIAL_ALERT = "SET_INITIAL_ALERT";
export const setInitialAlert = (data) => ({
	type: SET_INITIAL_ALERT,
	payload: data,
});

// --- Alert Modal ---

export const ACTIVATE_ALERT_MODAL = "ACTIVATE_ALERT_MODAL";
export const activateAlertModal = () => ({
	type: ACTIVATE_ALERT_MODAL,
});

export const DEACTIVATE_ALERT_MODAL = "DEACTIVATE_ALERT_MODAL";
export const deactivateAlertModal = () => ({
	type: DEACTIVATE_ALERT_MODAL,
});

// --- General ---

export const CLEAR_SURVEY = "CLEAR_SURVEY";
export const clearSurvey = () => ({
	type: CLEAR_SURVEY,
});
