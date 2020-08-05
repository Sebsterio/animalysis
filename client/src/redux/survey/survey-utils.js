import { getPoppedArray, getLastIndexOf, arrayify } from "utils/array";

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

export const getQueueWithUnshiftedLocations = (queue, { newLocations }) => {
	newLocations = arrayify(newLocations);
	let newQueue = [...queue];
	return [...newLocations, ...newQueue];
};

export const getQueueWithPushedLocations = (queue, { newLocations }) => {
	newLocations = arrayify(newLocations);
	let newQueue = [...queue];
	return [...newQueue, ...newLocations];
};

// Inject newLocations after last question of a given section(s) in queue
export const getQueueWithInjectedLocations = (
	queue,
	{ newLocations, after }
) => {
	newLocations = arrayify(newLocations);
	const indexOfLastRequiredQuestion = arrayify(after).reduce((acc, cur) => {
		const i = getLastIndexOf(queue, (loc) => loc.sectionName === cur);
		return i > acc ? i : acc;
	}, 0);
	let newQueue = [...queue];
	newQueue.splice(indexOfLastRequiredQuestion + 1, 0, ...newLocations);
	return newQueue;
};
