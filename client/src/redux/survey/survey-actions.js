export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const submitAnswer = (data) => ({
	type: SUBMIT_ANSWER,
	payload: data,
});

export const PUSH_TO_STACK = "PUSH_TO_STACK";
export const pushToStack = (data) => ({
	type: PUSH_TO_STACK,
	payload: data,
});

export const POP_FROM_STACK = "POP_FROM_STACK";
export const popFromStack = () => ({
	type: POP_FROM_STACK,
});
