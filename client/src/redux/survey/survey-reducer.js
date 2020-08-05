import { INITIAL_STATE } from "./survey-INITIAL_STATE";
import * as $ from "./survey-actions";
import {
	getQueueWithShiftedNextLocation,
	getQueueWithUnshiftedLocations,
	getQueueWithInjectedLocations,
	getQueueWithPushedLocations,
	getStateWithPushedItem,
	getStateWithPoppedItem,
} from "./survey-utils";
import { getArrayWithRemovedItem } from "utils/array";

const surveyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// --- Survey data ---

		case $.SET_SURVEY_DATA: {
			return {
				...state,
				data: { ...action.payload },
			};
		}

		// --- Current Location ---

		case $.SET_CURRENT_LOCATION: {
			return {
				...state,
				location: { ...action.payload },
			};
		}
		case $.ADD_ANSWER_TO_CURRENT_LOCATION: {
			return {
				...state,
				location: {
					...state.location,
					answer: action.payload,
				},
			};
		}

		// --- Location History ---

		case $.PUSH_LOCATION_TO_HISTORY: {
			return getStateWithPushedItem(state, "history", action.payload);
		}
		case $.POP_LOCATION_FROM_HISTORY: {
			return getStateWithPoppedItem(state, "history");
		}

		// --- Main Queue ---

		case $.SET_QUEUE: {
			return {
				...state,
				queue: [...action.payload],
			};
		}
		case $.SHIFT_NEXT_LOCATION_FROM_QUEUE: {
			return {
				...state,
				queue: getQueueWithShiftedNextLocation(state.queue),
			};
		}
		case $.UNSHIFT_LOCATIONS_TO_QUEUE: {
			return {
				...state,
				queue: getQueueWithUnshiftedLocations(state.queue, action.payload),
			};
		}
		case $.INJECT_LOCATIONS_TO_QUEUE: {
			return {
				...state,
				queue: getQueueWithInjectedLocations(state.queue, action.payload),
			};
		}
		case $.PUSH_LOCATIONS_TO_QUEUE: {
			return {
				...state,
				queue: getQueueWithPushedLocations(state.queue, action.payload),
			};
		}

		// --- Optional Queue ---

		case $.SET_OPTIONAL_QUEUE: {
			return {
				...state,
				optionalQueue: [...action.payload],
			};
		}
		case $.REMOVE_FROM_OPTIONAL_QUEUE: {
			return {
				...state,
				optionalQueue: getArrayWithRemovedItem(
					state.optionalQueue,
					action.payload
				),
			};
		}

		// ---------------------------

		default:
			return state;
	}
};

export default surveyReducer;
