import * as $ from "./error-actions";

// TODO: make it an array to store multiple errors
const INITIAL_STATE = {
	msg: "", // displayed to user
	target: "", // determines msg location in UI
};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_ERROR: {
			const { msg, target } = action.payload;
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
