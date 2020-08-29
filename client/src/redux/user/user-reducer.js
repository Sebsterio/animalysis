import * as $ from "./user-actions";

const INITIAL_STATE = {
	isAuthenticated: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SING_IN: {
			return {
				...state,
				isAuthenticated: true,
			};
		}

		default:
			return state;
	}
};

export default userReducer;
