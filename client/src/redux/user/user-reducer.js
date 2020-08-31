import * as $ from "./user-actions";

const INITIAL_STATE = {
	isLoading: false,
	isUpdating: false,
	isAuthenticated: false,
	email: "",
	token: "", // JWT
	type: "", // clinic | pet-owner | superuser | demo
	isAdmin: false,
	dateRegistered: undefined,
	dateModified: undefined, // don't use null (/api/auth)
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// --- Sync, Sing-in, Sing-up ---

		case $.SYNC_START:
		case $.SIGN_IN_START:
		case $.SIGN_UP_START:
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
		case $.SIGN_IN_SUCCESS:
		case $.SIGN_UP_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				...action.payload,
			};

		case $.SIGN_IN_FAIL:
		case $.SIGN_UP_FAIL:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
			};

		case $.SYNC_FAIL:
		case $.CLEAR:
			return {
				...INITIAL_STATE,
			};

		// --- Update ---

		case $.UPDATE_START:
		case $.DELETE_START:
			return {
				...state,
				isUpdating: true,
			};

		case $.UPDATE_SUCCESS:
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
