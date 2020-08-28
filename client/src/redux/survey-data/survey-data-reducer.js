// import { INITIAL_STATE } from "./survey-data-INITIAL_STATE";
import { surveyData } from "./temp-survey-data";

const INITIAL_STATE = surveyData;

const surveyDataReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default surveyDataReducer;
