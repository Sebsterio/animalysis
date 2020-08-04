// --------------- Current location ---------------

export const getLocation = (state) => state.survey.location;

export const getCurrentSectionName = (state) => getLocation(state).sectionName;

export const getCurrentQuestionIndex = (state) =>
	getLocation(state).questionIndex;

// Index of last question in current section
export const getLastQuestionIndex = (state) =>
	getCurrentSection(state).questions.length - 1;

export const getIsLastQuestionInSection = (state) => {
	const currentQuestionInex = getCurrentQuestionIndex(state);
	const lastQuestionInex = getLastQuestionIndex(state);
	return currentQuestionInex === lastQuestionInex;
};

// --------------- Location history ---------------

export const getHistory = (state) => state.survey.history;

export const getLastLocationInHistory = (state) => {
	const history = getHistory(state);
	return history[history.length - 1];
};

// --------------- Location queue---------------

export const getQueue = (state) => state.survey.queue;

export const getNextLocationInQueue = (state) => {
	const nextLocation = getQueue(state)[0];
	if (typeof nextLocation === "string")
		return { sectionName: nextLocation, questionIndex: 0 };
	return newLocation;
};

export const getIsQueueEmpty = (state) => !getQueue(state).length;

// --------------------- Data ---------------------

// Survey

export const getSurveyData = (state) => state.survey.data;

// Section

export const getCurrentSectionData = (state) => {
	const survey = getSurveyData(state);
	const sectionName = getCurrentSectionName(state);
	return survey ? survey[sectionName] : null;
};

export const getCurrentSectionTitle = (state) =>
	getCurrentSectionData(state).title || null;

// Question

export const getCurrentQuestionData = (state) => {
	const section = getCurrentSectionData(state);
	const questionIndex = getCurrentQuestionIndex(state);
	return section ? section.questions[questionIndex] : null;
};

// Get next location disregarding redirects
// export const getNextLocationInSequence = (state) => {
// 	const lastSectionIndex = getLastSectionIndex(state);
// 	const lastQuestionIndex = getLastQuestionIndex(state);
// 	const { sequenceName, sectionIndex, questionIndex } = getCurrentLocation(
// 		state
// 	);
// 	if (questionIndex < lastQuestionIndex) {
// 		return {
// 			sequenceName,
// 			sectionIndex,
// 			questionIndex: questionIndex + 1,
// 		};
// 	} else if (sectionIndex < lastSectionIndex) {
// 		return {
// 			sequenceName,
// 			sectionIndex: sectionIndex + 1,
// 			questionIndex: 0,
// 		};
// 	} else return null;
// };
