import * as $ from "./survey-data-actions";

export const publishSurvey = () => (dispatch, getState) => {
	const data = getState().surveyData;
	dispatch($.publishStart());
	setTimeout(() => {
		dispatch($.publishSuccess());
		// dispatch($.publishFail())
	}, 500);
};
