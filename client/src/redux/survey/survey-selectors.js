// --- Location ---

export const getLocation = (state) => state.survey.location;

export const getCurrentLocation = (state) => {
	const location = getLocation(state);
	return location[location.length - 1];
};

export const getCurrentSequenceIndex = (state) =>
	getCurrentLocation(state).sequence;

export const getCurrentSectionIndex = (state) =>
	getCurrentLocation(state).section;

export const getCurrentQuestionIndex = (state) =>
	getCurrentLocation(state).question;

// --- Data ---

export const getSequences = (state) => state.survey.sequences;

export const getCurrentSequence = (state) => {
	const sequences = getSequences(state);
	const sequenceIndex = getCurrentSequenceIndex(state);
	return sequences ? sequences[sequenceIndex] : null;
};

export const getCurrentSection = (state) => {
	const sequence = getCurrentSequence(state);
	const sectionIndex = getCurrentSectionIndex(state);
	return sequence ? sequence[sectionIndex] : null;
};

export const getCurrentQuestion = (state) => {
	const section = getCurrentSection(state);
	const questionIndex = getCurrentQuestionIndex(state);
	return section ? section.questions[questionIndex] : null;
};
