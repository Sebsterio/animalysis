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
	makeArrayWithRemovedItems,
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

		case $.CLEAR_HISTORY: {
			return makeState(state, "history", () => []);
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

		case $.REMOVE_ANSWER_FROM_CURRENT_LOCATION: {
			return makeState(state, "history", (currentHistory) =>
				makeArrayWithModifiedItem(currentHistory, -1, (location) => ({
					...location,
					answer: makeArrayWithRemovedItems(
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
					newItems: newLocations,
					targets: after,
					targetSelector: (location, target) => location.sectionName === target,
				})
			);
		}

		case $.REMOVE_LOCATIONS_FROM_QUEUE: {
			const { historyIndex } = action.payload;
			const selector = (location) =>
				!!location.addedBy && location.addedBy.historyIndex === historyIndex;
			return makeState(state, "queue", (currentQueue) =>
				makeArrayWithRemovedItems(currentQueue, null, selector)
			);
		}

		// --- Optional Queue ---

		case $.SET_OPTIONAL_QUEUE: {
			return makeState(state, "optionalQueue", () => [...action.payload]);
		}

		case $.CLEAR_OPTIONAL_QUEUE: {
			return makeState(state, "optionalQueue", () => []);
		}

		case $.ADD_TO_OPTIONAL_QUEUE: {
			return makeState(state, "optionalQueue", (currentQueue) =>
				makeArrayWithAddedUniqueItems(currentQueue, action.payload)
			);
		}

		case $.REMOVE_FROM_OPTIONAL_QUEUE: {
			return makeState(state, "optionalQueue", (currentQueue) =>
				makeArrayWithRemovedItems(currentQueue, action.payload)
			);
		}

		// --- Initial Optional Queue ---

		case $.SET_INITIAL_OPTIONAL_QUEUE: {
			return makeState(state, "initialOptionalQueue", () => [
				...action.payload,
			]);
		}

		case $.CLEAR_INITIAL_OPTIONAL_QUEUE: {
			return makeState(state, "initialOptionalQueue", () => []);
		}

		// --- Alert ---

		case $.SET_CURRENT_ALERT: {
			return makeState(state, "currentAlert", () => action.payload);
		}

		// --- Initial Alert ---

		case $.SET_INITIAL_ALERT: {
			return makeState(state, "initialAlert", () => action.payload);
		}

		// --- Alert Modal ---

		case $.ACTIVATE_ALERT_MODAL: {
			return makeState(state, "alertModalActive", () => true);
		}

		case $.DEACTIVATE_ALERT_MODAL: {
			return makeState(state, "alertModalActive", () => false);
		}

		// --- Title ---

		case $.SET_TITLE: {
			return makeState(state, "title", () => action.payload);
		}

		// ---------------------------

		case $.CLEAR_SURVEY: {
			return {
				...INITIAL_STATE,
			};
		}

		default:
			return state;
	}
};

export default surveyReducer;
