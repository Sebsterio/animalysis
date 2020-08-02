// --- Location history ---

export const getLocationHistory = (state) => state.survey.history;

export const getCurrentLocation = (state) => {
	const history = getLocationHistory(state);
	return history[history.length - 1];
};

export const getCurrentSequenceIndex = (state) =>
	getCurrentLocation(state).sequence;

export const getCurrentSectionIndex = (state) =>
	getCurrentLocation(state).section;

export const getCurrentQuestionIndex = (state) =>
	getCurrentLocation(state).question;

// -- Location landmarks ---

export const getLocationLandmarks = (state) => state.survey.landmarks;

export const getLastLandmark = (state) => {
	const landmarks = getLocationLandmarks(state);
	return landmarks[landmarks.length - 1];
};

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
