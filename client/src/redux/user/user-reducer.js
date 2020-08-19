import * as $ from "./user-actions";

const INITIAL_STATE = {
	isAuthenticated: true,
	name: "Will",
	clinic: {
		id: null,
		name: "",
		address: "",
		email: "",
		phone: "",
	},
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SING_IN: {
			return {
				...state,
				isAuthenticated: true,
			};
		}

		case $.MODIFY_USER_CLINIC: {
			return {
				...state,
				clinic: {
					...state.clinic,
					...action.payload,
				},
			};
		}

		default:
			return state;
	}
};

export default userReducer;
