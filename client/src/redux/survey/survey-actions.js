// --- Survey data ---

export const SET_SURVEY_DATA = "survey/SET_SURVEY_DATA";
export const setSurveyData = (data) => ({
	type: SET_SURVEY_DATA,
	payload: data,
});

// --- Current location ---

export const SET_ANSWER_IN_CURRENT_LOCATION =
	"survey/SET_ANSWER_IN_CURRENT_LOCATION";
export const setAnswerInCurrentLocation = (data) => ({
	type: SET_ANSWER_IN_CURRENT_LOCATION,
	payload: data,
});

export const ADD_ANSWER_IN_CURRENT_LOCATION =
	"survey/ADD_ANSWER_IN_CURRENT_LOCATION";
export const addAnswerInCurrentLocation = (data) => ({
	type: ADD_ANSWER_IN_CURRENT_LOCATION,
	payload: data,
});

export const REMOVE_ANSWER_FROM_CURRENT_LOCATION =
	"survey/REMOVE_ANSWER_FROM_CURRENT_LOCATION";
export const removeAnswerFromCurrentLocation = (data) => ({
	type: REMOVE_ANSWER_FROM_CURRENT_LOCATION,
	payload: data,
});

// --- Location history ---

export const PUSH_LOCATION_TO_HISTORY = "survey/PUSH_LOCATION_TO_HISTORY";
export const pushLocationToHistory = (data) => ({
	type: PUSH_LOCATION_TO_HISTORY,
	payload: data,
});

export const POP_LOCATION_FROM_HISTORY = "survey/POP_LOCATION_FROM_HISTORY";
export const popLocationFromHistory = () => ({
	type: POP_LOCATION_FROM_HISTORY,
});

export const CLEAR_HISTORY = "survey/CLEAR_HISTORY";
export const clearHistory = () => ({
	type: CLEAR_HISTORY,
});

// --- Main queue ---

export const SET_QUEUE = "survey/SET_QUEUE";
export const setQueue = (data) => ({
	type: SET_QUEUE,
	payload: data,
});

export const SHIFT_NEXT_LOCATION_FROM_QUEUE =
	"survey/SHIFT_NEXT_LOCATION_FROM_QUEUE";
export const shiftNextLocationFromQueue = () => ({
	type: SHIFT_NEXT_LOCATION_FROM_QUEUE,
});

export const UNSHIFT_LOCATIONS_TO_QUEUE = "survey/UNSHIFT_LOCATIONS_TO_QUEUE";
export const unshiftLocationsToQueue = (data) => ({
	type: UNSHIFT_LOCATIONS_TO_QUEUE,
	payload: data,
});

export const INJECT_LOCATIONS_TO_QUEUE = "survey/INJECT_LOCATIONS_TO_QUEUE";
export const injectLocationsToQueue = (data) => ({
	type: INJECT_LOCATIONS_TO_QUEUE,
	payload: data,
});

export const PUSH_LOCATIONS_TO_QUEUE = "survey/PUSH_LOCATIONS_TO_QUEUE";
export const pushLocationsToQueue = (data) => ({
	type: PUSH_LOCATIONS_TO_QUEUE,
	payload: data,
});

export const REMOVE_LOCATIONS_FROM_QUEUE = "survey/REMOVE_LOCATIONS_FROM_QUEUE";
export const removeLocationsFromQueue = (data) => ({
	type: REMOVE_LOCATIONS_FROM_QUEUE,
	payload: data,
});

// --- Optional queue ---

export const SET_OPTIONAL_QUEUE = "survey/SET_OPTIONAL_QUEUE";
export const setOptionalQueue = (data) => ({
	type: SET_OPTIONAL_QUEUE,
	payload: data,
});

export const CLEAR_OPTIONAL_QUEUE = "survey/CLEAR_OPTIONAL_QUEUE";
export const clearOptionalQueue = (data) => ({
	type: CLEAR_OPTIONAL_QUEUE,
	payload: data,
});

export const ADD_TO_OPTIONAL_QUEUE = "survey/ADD_TO_OPTIONAL_QUEUE";
export const addToOptionalQueue = (data) => ({
	type: ADD_TO_OPTIONAL_QUEUE,
	payload: data,
});

export const REMOVE_FROM_OPTIONAL_QUEUE = "survey/REMOVE_FROM_OPTIONAL_QUEUE";
export const removeFromOptionalQueue = (data) => ({
	type: REMOVE_FROM_OPTIONAL_QUEUE,
	payload: data,
});

// --- Initial optional queue ---

export const SET_INITIAL_OPTIONAL_QUEUE = "survey/SET_INITIAL_OPTIONAL_QUEUE";
export const setInitialOptionalQueue = (data) => ({
	type: SET_INITIAL_OPTIONAL_QUEUE,
	payload: data,
});

export const CLEAR_INITIAL_OPTIONAL_QUEUE =
	"survey/CLEAR_INITIAL_OPTIONAL_QUEUE";
export const clearInitialOptionalQueue = () => ({
	type: CLEAR_INITIAL_OPTIONAL_QUEUE,
});

// --- Alert ---

export const SET_CURRENT_ALERT = "survey/SET_CURRENT_ALERT";
export const setCurrentAlert = (data) => ({
	type: SET_CURRENT_ALERT,
	payload: data,
});

export const SET_INITIAL_ALERT = "survey/SET_INITIAL_ALERT";
export const setInitialAlert = (data) => ({
	type: SET_INITIAL_ALERT,
	payload: data,
});

// --- Alert Modal ---

export const ACTIVATE_ALERT_MODAL = "survey/ACTIVATE_ALERT_MODAL";
export const activateAlertModal = () => ({
	type: ACTIVATE_ALERT_MODAL,
});

export const DEACTIVATE_ALERT_MODAL = "survey/DEACTIVATE_ALERT_MODAL";
export const deactivateAlertModal = () => ({
	type: DEACTIVATE_ALERT_MODAL,
});

// --- Title ---

export const SET_TITLE = "survey/SET_TITLE";
export const setTitle = (data) => ({
	type: SET_TITLE,
	payload: data,
});

// --- PetId ---

export const SET_PET_ID = "survey/SET_PET_ID";
export const setPetId = (data) => ({
	type: SET_PET_ID,
	payload: data,
});

// --- General ---

export const CLEAR = "survey/CLEAR";
export const clear = () => ({
	type: CLEAR,
});
