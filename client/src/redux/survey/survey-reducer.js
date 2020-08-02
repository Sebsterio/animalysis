import { surveyData } from "./survey-data";

import * as $ from "./survey-actions";
import {
	getDataWithUpdatedAnswer,
	getStateWithPushedItem,
	getStateWithPoppedItem,
} from "./survey-utils";

// Answers get added to surveyData
// Location (FILO) keeps track of pages to return to upon completing current page
//   (which is at the top of the stack)

const INITIAL_STATE = {
	sequences: surveyData,
	history: [
		{
			sequence: "main",
			section: 0,
			question: 0,
		},
	],
	// stack of locations to go to when ran out of questions
	landmarks: [],
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

		// --- Location History ---

		case $.PUSH_LOCATION: {
			return getStateWithPushedItem(state, "history", action.payload);
		}

		case $.POP_LOCATION: {
			return getStateWithPoppedItem(state, "history");
		}

		// --- Location Landmarks ---

		case $.PUSH_LANDMARK: {
			return getStateWithPushedItem(state, "landmarks", action.payload);
		}

		case $.POP_LANDMARK: {
			return getStateWithPoppedItem(state, "landmarks");
		}

		default:
			return state;
	}
};

export default surveyReducer;
