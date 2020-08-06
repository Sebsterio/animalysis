import { isEmpty } from "utils/object";

// --------------- Location history ---------------

export const getHistory = (state) => state.survey.history;

export const getHistoryLength = (state) => getHistory(state).length;

export const getIsHistoryEmpty = (state) => getHistory(state).length <= 1;

export const getPreviousLocation = (state) => {
	const history = getHistory(state);
	return history[history.length - 2];
};

// --------------- Current location ---------------

export const getCurrentLocation = (state) => {
	const history = getHistory(state);
	return history[history.length - 1];
};

export const getCurrentLocationHistoryIndex = (state) =>
	getHistoryLength(state) - 1;

export const getCurrentSectionName = (state) =>
	getCurrentLocation(state).sectionName;

export const getCurrentQuestionIndex = (state) =>
	getCurrentLocation(state).questionIndex;

export const getCurrentQuestionAnswer = (state) =>
	getCurrentLocation(state).answer;

export const getIsCurrentQuestionAnswered = (state) => {
	const answer = getCurrentQuestionAnswer(state);
	if (Array.isArray(answer)) return !!answer.length;
	return answer !== null && answer !== undefined;
};

// Index of last question in current section
export const getLastQuestionIndex = (state) => {
	const section = getCurrentSectionData(state);
	return section ? section.questions.length - 1 : null;
};

export const getIsLastQuestionInSection = (state) => {
	const currentQuestionInex = getCurrentQuestionIndex(state);
	const lastQuestionInex = getLastQuestionIndex(state);
	return currentQuestionInex === lastQuestionInex;
};

// --------------- Location queue---------------

export const getQueue = (state) => state.survey.queue;

export const getQueueLength = (state) => getQueue(state).length;

export const getNextLocation = (state) => {
	return getQueue(state)[0];
};

// --------------------- Data ---------------------

// Survey

export const getSurveyData = (state) => state.survey.data;

export const getIsSurveyLoaded = (state) => !isEmpty(getSurveyData(state));

// Section

export const getSectionData = (state, sectionName) => {
	const survey = getSurveyData(state);
	return survey ? survey[sectionName] : null;
};

export const getCurrentSectionData = (state) => {
	const currentSectionName = getCurrentSectionName(state);
	return getSectionData(state, currentSectionName);
};

export const getCurrentSectionTitle = (state) => {
	const currentSection = getCurrentSectionData(state);
	return currentSection ? currentSection.title : null;
};

// Question

// TEMP
const getCurrentPet = (state) => ({
	name: "Benny",
	species: "canine",
});

export const getCurrentQuestionData = (state) => {
	const section = getCurrentSectionData(state);
	const questionIndex = getCurrentQuestionIndex(state);
	const question = section.questions[questionIndex];
	if (typeof question === "function") return question(getCurrentPet(state));
	return question;
};

// ------------------------- Conversion ----------------------------

// Get an array of location objects from sectionName
export const getLocationsFromSection = (state, sectionName) => {
	const sectionData = getSectionData(state, sectionName);
	return sectionData.questions.map((_, i) => ({
		sectionName,
		questionIndex: i,
	}));
};

// Map section names into location object
export const getUnpackedQueue = (state, queue) => {
	const newQueue = [];
	queue.forEach((sectionName) =>
		newQueue.push(...getLocationsFromSection(state, sectionName))
	);
	return newQueue;
};
