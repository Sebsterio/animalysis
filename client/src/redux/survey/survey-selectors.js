// --- Location history ---

export const getLocationHistory = (state) => state.survey.history;

export const getCurrentLocation = (state) => {
	const history = getLocationHistory(state);
	return history[history.length - 1];
};

export const getCurrentSequenceName = (state) =>
	getCurrentLocation(state).sequenceName;

export const getCurrentSectionIndex = (state) =>
	getCurrentLocation(state).sectionIndex;

export const getCurrentQuestionIndex = (state) =>
	getCurrentLocation(state).questionIndex;

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
	const sequenceName = getCurrentSequenceName(state);
	return sequences ? sequences[sequenceName] : null;
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

export const getLastQuestionIndex = (section) => section.questions.length - 1;

export const getLastSectionIndex = (sequence) => sequence.length - 1;

// Get next location disregarding redirects
export const getNextLocationInSequence = (state) => {
	const lastSectionIndex = getLastSectionIndex(getCurrentSequence(state));
	const lastQuestionIndex = getLastQuestionIndex(getCurrentSection(state));
	const { sequenceName, sectionIndex, questionIndex } = getCurrentLocation(
		state
	);

	if (questionIndex < lastQuestionIndex) {
		return {
			sequenceName,
			sectionIndex,
			questionIndex: questionIndex + 1,
		};
	} else if (sectionIndex < lastSectionIndex) {
		return {
			sequenceName,
			sectionIndex: sectionIndex + 1,
			questionIndex: 0,
		};
	} else return null;
};
