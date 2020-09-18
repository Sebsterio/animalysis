import * as $ from "./clinic-actions";

const INITIAL_STATE = {
	// Sync status
	isLoading: false,
	isUpdating: false,
	// Meta
	dateModified: undefined,
	modifiedBy: "",
	// Data
	id: null,
	name: "",
	address: "",
	email: "",
	phone: "",
	phone2: "",
	logoUrl: "",
	// pet-owner-mode only
	reminderDismissed: false,
	// vet-mode only
	members: [
		// {
		// 	username: '',
		// 	role: '' // admin | assistant
		// }
	],
};

const clinicReducer = (state = INITIAL_STATE, action) => {
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

		case $.CLEAR: {
			return { ...INITIAL_STATE };
		}

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
			return {
				...state,
				isLoading: false,
				...action.payload,
			};

		case $.FETCH_SUCCESS:
			return {
				...INITIAL_STATE,
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
				...action.payload,
			};

		case $.UPDATE_FAIL:
		case $.DELETE_SUCCESS:
		case $.DELETE_FAIL:
			return {
				...state,
				isUpdating: false,
			};

		default:
			return state;
	}
};

export default clinicReducer;
