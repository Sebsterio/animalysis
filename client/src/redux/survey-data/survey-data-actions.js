// ---------------- Local state ---------------

export const SET_SURVEY_DATA = "survey-data/SET_SURVEY_DATA";
export const setSurveyData = (data) => ({
	type: SET_SURVEY_DATA,
	payload: data,
});

export const CLEAR = "survey-data/CLEAR";
export const clear = () => ({
	type: CLEAR,
});

// ---------------- Sync status ---------------

// Publish

export const PUBLISH_START = "survey-data/PUBLISH_START";
export const publishStart = () => ({
	type: PUBLISH_START,
});

export const PUBLISH_SUCCESS = "survey-data/PUBLISH_SUCCESS";
export const publishSuccess = (data) => ({
	type: PUBLISH_SUCCESS,
	payload: data,
});

export const PUBLISH_FAIL = "survey-data/PUBLISH_FAIL";
export const publishFail = () => ({
	type: PUBLISH_FAIL,
});

// Fetch

export const FETCH_START = "survey-data/FETCH_START";
export const fetchStart = () => ({
	type: FETCH_START,
});
export const FETCH_SUCCESS = "survey-data/FETCH_SUCCESS";
export const fetchSuccess = (data) => ({
	type: FETCH_SUCCESS,
	payload: data,
});
export const FETCH_FAIL = "survey-data/FETCH_FAIL";
export const fetchFail = () => ({
	type: FETCH_FAIL,
});
export const UP_TO_DATE = "survey-data/UP_TO_DATE";
export const upToDate = () => ({
	type: UP_TO_DATE,
});
