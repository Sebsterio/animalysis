import * as $ from "./error-actions";

const INITIAL_STATE = {
	note: "", // developer feedback
	msg: "", // displayed to user
	id: "", // determines msg location in UI
};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_ERROR: {
			const { note, msg, id } = action;
			return { note, msg, id };
		}

		case $.CLEAR_ERROR: {
			return { ...INITIAL_STATE };
		}
		default:
			return state;
	}
};

export default errorReducer;
