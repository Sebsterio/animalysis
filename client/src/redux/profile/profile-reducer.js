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
	dateModified: undefined,
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------------ Local state ------------
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

		// Create

		case $.CREATE_START:
			return {
				...state,
				isLoading: true,
			};

		case $.CREATE_SUCCESS:
			return {
				...state,
				isLoading: false,
				...action.payload,
			};

		case $.CREATE_FAIL:
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
				...action.payload,
			};

		case $.DELETE_SUCCESS:
		case $.UPDATE_FAIL:
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
