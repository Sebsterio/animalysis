import { getPoppedArray, getLastIndexOf } from "utils/array";

export const getStateWithPushedItem = (state, arr, item) => {
	return {
		...state,
		[arr]: [...state[arr], item],
	};
};

export const getStateWithPoppedItem = (state, arr) => {
	return {
		...state,
		[arr]: getPoppedArray(state[arr]),
	};
};

// ----------------- Queue ------------------

export const getQueueWithShiftedNextLocation = (queue) => {
	const newQueue = [...queue];
	newQueue.shift();
	return newQueue;
};

export const getQueueWithUnshiftedLocations = (queue, { newQuestions }) => {
	let newQueue = [...queue];
	return [...newQuestions, ...newQueue];
};

export const getQueueWithPushedLocations = (queue, { newQuestions }) => {
	let newQueue = [...queue];
	return [...newQueue, ...newQuestions];
};

// Inject newQuestions after last question of a given section in queue
export const getQueueWithInjectedLocations = (
	queue,
	{ after, newQuestions }
) => {
	const selector = (item) => item.sectionName === after;
	let indexOfLastRequiredQuestion = getLastIndexOf(queue, selector);
	let newQueue = [...queue];
	newQueue.splice(indexOfLastRequiredQuestion + 1, 0, ...newQuestions);
	return newQueue;
};
