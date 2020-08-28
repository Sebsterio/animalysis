// import { INITIAL_STATE } from "./survey-data-INITIAL_STATE";
import { surveyData } from "./temp-survey-data";

import * as $ from "./survey-data-actions";

const INITIAL_STATE = surveyData;

const surveyDataReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_SURVEY_DATA: {
			const { queues, sections } = action.payload;
			const { primerQueue, mainQueue, optionalQueue } = queues;
			return { sections, primerQueue, mainQueue, optionalQueue };
		}

		default:
			return state;
	}
};

export default surveyDataReducer;
