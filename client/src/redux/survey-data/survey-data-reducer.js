// import { surveyData } from "./temp-survey-data";
// const INITIAL_STATE = surveyData;

import { INITIAL_STATE } from "./survey-data-INITIAL_STATE";
import * as $ from "./survey-data-actions";

const surveyDataReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ---------------- Local state ---------------

		case $.SET_SURVEY_DATA: {
			const { sections, queues } = action.payload;
			return {
				...state,
				dateModified: new Date(),
				primerQueue: [...queues.primerQueue.list],
				mainQueue: [...queues.mainQueue.list],
				optionalQueue: [...queues.optionalQueue.list],
				sections,
			};
		}

		case $.CLEAR: {
			return { ...INITIAL_STATE };
		}
		// ---------------- Sync status ---------------
		//  Publish

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
				...action.payload,
			};
		}
		case $.PUBLISH_FAIL: {
			return {
				...state,
				publishing: false,
			};
		}

		// Fetch

		case $.FETCH_START: {
			return {
				...state,
				loading: true,
			};
		}
		case $.FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				...action.payload,
			};
		}
		case $.FETCH_FAIL:
		case $.UP_TO_DATE: {
			return {
				...state,
				loading: false,
			};
		}

		// ---------------

		default:
			return state;
	}
};

export default surveyDataReducer;
