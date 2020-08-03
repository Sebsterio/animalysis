import { shallowCompare } from "utils/object";

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

// Index of last section in current sequence
export const getLastSectionIndex = (state) =>
	getCurrentSequence(state).length - 1;

export const getCurrentQuestionIndex = (state) =>
	getCurrentLocation(state).questionIndex;

// Index of last question in current section
export const getLastQuestionIndex = (state) =>
	getCurrentSection(state).questions.length - 1;

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

export const getCurrentSectionTitle = (state) =>
	getCurrentSection(state).title || null;

//
// Get next location disregarding redirects
export const getNextLocationInSequence = (state) => {
	const lastSectionIndex = getLastSectionIndex(state);
	const lastQuestionIndex = getLastQuestionIndex(state);
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

// Is next location in sequence equal to last landmark
export const getIsNextLocationInSequenceLandmarked = (state) => {
	const lastLandmark = getLastLandmark(state);
	if (!lastLandmark) return null;
	const nextLocationInSequence = getNextLocationInSequence(state);
	if (!nextLocationInSequence) return null;
	return shallowCompare(nextLocationInSequence, lastLandmark);
};
