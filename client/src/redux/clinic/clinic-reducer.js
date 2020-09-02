import * as $ from "./clinic-actions";

const INITIAL_STATE = {
	id: null,
	name: "",
	address: "",
	email: "",
	phone: "",
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
		case $.SET: {
			return { ...action.payload };
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

		default:
			return state;
	}
};

export default clinicReducer;
