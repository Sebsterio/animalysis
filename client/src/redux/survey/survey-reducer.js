import { INITIAL_STATE } from "./survey-INITIAL_STATE";
import * as $ from "./survey-actions";
import { makeState } from "utils/state";
import {
	arrayify,
	makeArrayWithPushedItems,
	makeArrayWithUnshiftedItems,
	makeArrayWithAddedUniqueItems,
	makeArrayWithItemsInjectedAfterTargets,
	makeArrayWithModifiedItem,
	makeArrayWithPoppedItem,
	makeArrayWithShiftedItem,
	makeArrayWithRemovedItem,
} from "utils/array";

const surveyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// --- Survey data ---

		case $.SET_SURVEY_DATA: {
			return makeState(state, "data", () => ({ ...action.payload }));
		}

		// --- Location History ---

		case $.PUSH_LOCATION_TO_HISTORY: {
			return makeState(state, "history", (currentHistory) =>
				makeArrayWithPushedItems(currentHistory, action.payload)
			);
		}

		case $.POP_LOCATION_FROM_HISTORY: {
			return makeState(state, "history", (currentHistory) =>
				makeArrayWithPoppedItem(currentHistory)
			);
		}

		// --- Current Location ---

		case $.SET_ANSWER_IN_CURRENT_LOCATION: {
			return makeState(state, "history", (currentHistory) =>
				makeArrayWithModifiedItem(currentHistory, -1, (location) => ({
					...location,
					answer: action.payload,
				}))
			);
		}

		case $.ADD_ANSWER_IN_CURRENT_LOCATION: {
			return makeState(state, "history", (currentHistory) =>
				makeArrayWithModifiedItem(currentHistory, -1, (location) => ({
					...location,
					answer: makeArrayWithAddedUniqueItems(
						arrayify(location.answer),
						action.payload
					),
				}))
			);
		}

		// --- Main Queue ---

		case $.SET_QUEUE: {
			return makeState(state, "queue", () => [...action.payload]);
		}

		case $.PUSH_LOCATIONS_TO_QUEUE: {
			const { newLocations } = action.payload;
			return makeState(state, "queue", (currentQueue) =>
				makeArrayWithPushedItems(currentQueue, newLocations)
			);
		}

		case $.UNSHIFT_LOCATIONS_TO_QUEUE: {
			const { newLocations } = action.payload;
			return makeState(state, "queue", (currentQueue) =>
				makeArrayWithUnshiftedItems(currentQueue, newLocations)
			);
		}

		case $.SHIFT_NEXT_LOCATION_FROM_QUEUE: {
			return makeState(state, "queue", (currentQueue) =>
				makeArrayWithShiftedItem(currentQueue)
			);
		}

		case $.INJECT_LOCATIONS_TO_QUEUE: {
			const { newLocations, after } = action.payload;
			return makeState(state, "queue", (currentQueue) =>
				makeArrayWithItemsInjectedAfterTargets({
					array: currentQueue,
					items: newLocations,
					targets: after,
					targetSelector: (location, target) => location.sectionName === target,
				})
			);
		}

		// --- Optional Queue ---

		case $.SET_OPTIONAL_QUEUE: {
			return makeState(state, "optionalQueue", () => [...action.payload]);
		}

		case $.REMOVE_FROM_OPTIONAL_QUEUE: {
			return makeState(state, "queue", (currentQueue) =>
				makeArrayWithRemovedItem(currentQueue, action.payload)
			);
		}

		// ---------------------------

		default:
			return state;
	}
};

export default surveyReducer;
