import * as $ from "./survey-data-actions";

export const publishSurvey = () => (dispatch, getState) => {
	dispatch($.publishStart());
	// POST(getState().surveyData))
	setTimeout(() => {
		dispatch($.publishSuccess());
		// dispatch($.publishFail())
	}, 500);
};
