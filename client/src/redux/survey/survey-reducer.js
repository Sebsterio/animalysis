import { INITIAL_STATE } from "./survey-INITIAL_STATE";
import * as $ from "./survey-actions";
import { getStateWithPushedItem, getStateWithPoppedItem } from "./survey-utils";

const surveyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// --- Survey sequences ---

		case $.SUBMIT_ANSWER: {
			return {
				...state,
				location: {
					...state.location,
					answer: action.payload,
				},
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
