// --- survey data ---

export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const submitAnswer = (data) => ({
	type: SUBMIT_ANSWER,
	payload: data,
});

// --- location history ---

export const PUSH_LOCATION = "PUSH_LOCATION";
export const pushLocation = (data) => ({
	type: PUSH_LOCATION,
	payload: data,
});

export const POP_LOCATION = "POP_LOCATION";
export const popLocation = () => ({
	type: POP_LOCATION,
});

// --- location landmarks ---

export const PUSH_LANDMARK = "PUSH_LANDMARK";
export const pushLandmark = (data) => ({
	type: PUSH_LANDMARK,
	payload: data,
});

export const POP_LANDMARK = "POP_LANDMARK";
export const popLandmark = () => ({
	type: POP_LANDMARK,
});
