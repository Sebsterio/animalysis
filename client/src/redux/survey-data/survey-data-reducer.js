// import { INITIAL_STATE } from "./survey-data-INITIAL_STATE";
import { surveyData } from "./temp-survey-data";

import * as $ from "./survey-data-actions";

const INITIAL_STATE = surveyData;

const surveyDataReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_SURVEY_DATA: {
			const { sections, queues } = action.payload;
			return {
				// replace state
				sections,
				primerQueue: [...queues.primerQueue.list],
				mainQueue: [...queues.mainQueue.list],
				optionalQueue: [...queues.optionalQueue.list],
				dateModified: new Date(),
			};
		}

		// --------- Sync ---------

		case $.PUBLISH_START: {
			return {
				...state,
				publishing: true,
			};
		}
		case $.PUBLISH_SUCCESS: {
			return {
				...state,
				publishing: false,
				datePublished: new Date(),
			};
		}
		case $.PUBLISH_SUCCESS: {
			return {
				...state,
				publishing: false,
			};
		}

		default:
			return state;
	}
};

export default surveyDataReducer;
