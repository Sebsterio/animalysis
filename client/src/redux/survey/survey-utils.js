// Mark selected answer and unmark alternative answers
export const getDataWithUpdatedAnswer = (state, answerIndex) => {
	const { location, sequences } = state;
	const currentLocation = location[location.length - 1];
	const { sequence, section, question } = currentLocation;

	const newSequences = { ...sequences };
	const questionData = newSequences[sequence][section].questions[question];
	questionData.answers.forEach((answer, i) => {
		if (i === answerIndex) answer.selected = true;
		else answer.selected = false;
	});

	return newSequences;
};

export const popLocation = (location) => {
	const newLocation = [...location];
	newLocation.pop();
	return newLocation;
};

export const setLocation = (location, newProps) => {
	const currentLocation = location[location.length - 1];
	const newCurrentLocation = {
		...currentLocation,
		...newProps,
	};
	return [...popLocation(location), newCurrentLocation];
};
