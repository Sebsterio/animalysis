import * as $ from "./error-actions";

const INITIAL_STATE = {
	msg: "", // displayed to user
	target: "", // determines msg location in UI
	// email | newEmail | password
};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_ERROR: {
			const { msg, target } = action.feedback;
			return { msg, target };
		}

		case $.CLEAR_ERROR: {
			return { ...INITIAL_STATE };
		}
		default:
			return state;
	}
};

export default errorReducer;
