import * as $ from "./profile-actions";

const INITIAL_STATE = {
	name: "",
	surname: "",
	email: "",
	phone: "",
	reminderDismissed: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.MODIFY_PROFILE: {
			return {
				...state,
				...action.payload,
			};
		}

		case $.DISMISS_REMINDER: {
			return {
				...state,
				reminderDismissed: true,
			};
		}

		default:
			return state;
	}
};

export default profileReducer;
