import * as $ from "./user-actions";
import { filterUserRes } from "./user-utils";

const INITIAL_STATE = {
	// Sync status
	isLoading: false,
	isUpdating: false,
	// Data
	token: "", // JWT
	email: "",
	type: "", // clinic | pet-owner | superuser | demo
	// Meta
	dateModified: undefined, // NOTE: dont' use null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------------ Local state ------------

		case $.MODIFY:
			return {
				...state,
				...action.payload,
			};

		case $.CLEAR:
			return { ...INITIAL_STATE };

		// ------------ Sync status ------------

		// Sync, Sing-in, Sing-up

		case $.SYNC_START:
		case $.FETCH_START:
		case $.CREATE_START:
			return {
				...state,
				isLoading: true,
			};

		case $.UP_TO_DATE:
		case $.SYNC_CANCELED:
			return {
				...state,
				isLoading: false,
			};

		case $.SYNC_SUCCESS:
		case $.FETCH_SUCCESS:
		case $.CREATE_SUCCESS:
			return {
				...state, // don't overwrite because token persists
				isLoading: false,
				...filterUserRes(action.payload),
			};

		case $.FETCH_FAIL:
		case $.CREATE_FAIL:
			return {
				...state,
				isLoading: false,
				token: null,
			};

		case $.SYNC_FAIL:
			return {
				...INITIAL_STATE,
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

export default userReducer;
