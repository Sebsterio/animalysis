// --- survey data ---

export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const submitAnswer = (data) => ({
	type: SUBMIT_ANSWER,
	payload: data,
});

// --- location ---

export const SET_LOCATION = "SET_LOCATION";
export const setLocation = (data) => ({
	type: SET_LOCATION,
	payload: data,
});

export const PUSH_LOCATION = "PUSH_LOCATION";
export const pushLocation = (data) => ({
	type: PUSH_LOCATION,
	payload: data,
});

export const POP_LOCATION = "POP_LOCATION";
export const popLocation = () => ({
	type: POP_LOCATION,
});
