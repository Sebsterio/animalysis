export const SET_SURVEY_DATA = "survey-data/SET_SURVEY_DATA";
export const setSurveyData = (data) => ({
	type: SET_SURVEY_DATA,
	payload: data,
});

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
