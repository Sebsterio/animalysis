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
		case $.AUTH_START:
			return {
				...state,
				isLoading: true,
			};

		case $.AUTH_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				...action.payload,
			};

		case $.AUTH_FAIL:
			const { err, msg } = action;
			console.log({ err, msg });
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
