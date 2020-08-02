import { getPoppedArray } from "utils/array";

// Mark selected answer and unmark alternative answers
export const getDataWithUpdatedAnswer = (state, answerIndex) => {
	const { history, sequences } = state;
	const currentLocation = history[history.length - 1];
	const { sequence, section, question } = currentLocation;

	const newSequences = { ...sequences };
	const questionData = newSequences[sequence][section].questions[question];
	questionData.answers.forEach((answer, i) => {
		if (i === answerIndex) answer.selected = true;
		else answer.selected = false;
	});

	return newSequences;
};

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
