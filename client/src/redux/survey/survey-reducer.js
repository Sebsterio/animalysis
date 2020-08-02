import { surveyData } from "./survey-data";

import * as $ from "./survey-actions";
import {
	getDataWithUpdatedAnswer,
	popLocation,
	setLocation,
} from "./survey-utils";

// Answers get added to surveyData
// Location (FILO) keeps track of pages to return to upon completing current page
//   (which is at the top of the stack)

const INITIAL_STATE = {
	sequences: surveyData,
	location: [
		{
			sequence: "main",
			section: 0,
			question: 0,
		},
	],
};

const surveyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// --- Survey sequences ---

		case $.SUBMIT_ANSWER: {
			return {
				...state,
				sequences: getDataWithUpdatedAnswer(state, action.payload),
			};
		}

		// --- Location ---

		case $.SET_LOCATION: {
			return {
				...state,
				location: setLocation(state.location, action.payload),
			};
		}

		case $.PUSH_LOCATION: {
			return {
				...state,
				location: [...state.location, action.payload],
			};
		}

		case $.POP_LOCATION: {
			return {
				...state,
				location: popLocation(state.location),
			};
		}

		default:
			return state;
	}
};

export default surveyReducer;
