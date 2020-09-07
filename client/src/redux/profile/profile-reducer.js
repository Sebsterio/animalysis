import * as $ from "./profile-actions";

const INITIAL_STATE = {
	// Sync status
	isLoading: false,
	isUpdating: false,
	// UI status
	reminderDismissed: false,
	// Data
	// (email in user-reducer)
	firstName: "",
	surname: "",
	phone: "",
	// Meta
	dateUpdated: undefined,
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------------ Local state ------------

		case $.SET: {
			return {
				...INITIAL_STATE,
				...action.payload,
			};
		}

		case $.MODIFY: {
			return {
				...state,
				...action.payload,
			};
		}

		case $.CLEAR:
			return { ...INITIAL_STATE };

		case $.DISMISS_REMINDER: {
			return {
				...state,
				reminderDismissed: true,
			};
		}

		// ------------ Sync status ------------

		// Create, fetch

		case $.CREATE_START:
		case $.FETCH_START:
			return {
				...state,
				isLoading: true,
			};

		case $.CREATE_SUCCESS:
		case $.FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				...action.payload,
			};

		case $.CREATE_FAIL:
		case $.FETCH_FAIL:
		case $.UP_TO_DATE:
			return {
				...state,
				isLoading: false,
			};

		// Update, delete

		case $.UPDATE_START:
		case $.DELETE_START:
			return {
				...state,
				isUpdating: true,
			};

		case $.UPDATE_SUCCESS:
			return {
				...state,
				isUpdating: false,
				...action.payload, // dateUpdated
			};

		case $.UPDATE_FAIL:
		case $.DELETE_SUCCESS:
		case $.DELETE_FAIL:
			return {
				...state,
				isUpdating: false,
			};

		// ---------------

		default:
			return state;
	}
};

export default profileReducer;
