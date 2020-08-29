import * as $ from "./clinic-actions";

const INITIAL_STATE = {
	id: null,
	name: "",
	address: "",
	email: "",
	phone: "",
	reminderDismissed: false,
};

const clinicReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.MODIFY_CLINIC: {
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

export default clinicReducer;
