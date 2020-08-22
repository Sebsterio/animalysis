import * as $ from "./user-actions";

const INITIAL_STATE = {
	isAuthenticated: true,
	clinic: {
		id: null,
		name: "",
		address: "",
		email: "",
		phone: "",
		reminderDismissed: false,
	},
	info: {
		name: "",
		surname: "",
		email: "",
		phone: "",
		reminderDismissed: false,
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

		case $.MODIFY_USER_INFO: {
			return {
				...state,
				info: {
					...state.info,
					...action.payload,
				},
			};
		}

		case $.DISMISS_USER_REMINDER: {
			return {
				...state,
				info: {
					...state.info,
					reminderDismissed: true,
				},
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

		case $.DISMISS_CLINIC_REMINDER: {
			return {
				...state,
				clinic: {
					...state.clinic,
					reminderDismissed: true,
				},
			};
		}

		default:
			return state;
	}
};

export default userReducer;
