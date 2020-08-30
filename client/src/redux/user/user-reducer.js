import * as $ from "./user-actions";

const INITIAL_STATE = {
	isLoading: false,
	isAuthenticated: false,
	email: "",
	token: "", // JWT
	type: "", // clinic | pet-owner | superuser | demo
	role: "", // (if type:clinic) admin | assistant
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SYNC_START:
		case $.SIGN_IN_START:
		case $.SIGN_UP_START:
			return {
				...state,
				isLoading: true,
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

		case $.SYNC_FAIL:
		case $.SIGN_IN_FAIL:
		case $.SIGN_UP_FAIL:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
			};

		case $.CLEAR_DATA:
			return {
				...INITIAL_STATE,
			};

		default:
			return state;
	}
};

export default userReducer;
