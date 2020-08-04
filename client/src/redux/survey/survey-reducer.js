import { surveyData } from "./survey-data";

import * as $ from "./survey-actions";
import {
	getDataWithUpdatedAnswer,
	getStateWithPushedItem,
	getStateWithPoppedItem,
} from "./survey-utils";

const INITIAL_STATE = {
	// Highest level of urgency resulting from answers so far
	alert: 0,
	// Questions with dynamically added answers
	sequences: surveyData,
	// Location history stack (FILO)
	history: [
		{
			sequenceName: "main",
			sectionIndex: 0,
			questionIndex: 0,
		},
	],
	// Stack of locations to go to upon completing an optional section (FILO)
	landmarks: [],

	// ---- NEW ----

	// locations in survey, along with selectd answers
	// used to 'goBack' and to compile final report
	history: [
		// {
		// 	sectionName
		//  questionIndex
		//  answer: index | array-of-indexes | text
		//  queue - sections to visit next; leftmost = current
		// }
	],
	// locations popped during 'goBack'; used to restore history on 'goNext'
	futureHistory: [],
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
