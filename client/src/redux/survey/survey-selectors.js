import { isEmpty } from "utils/object";

export const getIsSurveyLoaded = (state) => !isEmpty(state.survey.data);

// --------------- Current location ---------------

export const getCurrentLocation = (state) => state.survey.location;

export const getCurrentSectionName = (state) =>
	getCurrentLocation(state).sectionName;

export const getCurrentQuestionIndex = (state) =>
	getCurrentLocation(state).questionIndex;

export const getIsCurrentQuestionAnswered = (state) =>
	!!getCurrentLocation(state).answer;

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

// --------------- Location history ---------------

export const getHistory = (state) => state.survey.history;

export const getHistoryLength = (state) => getHistory(state).length;

export const getIsHistoryEmpty = (state) => !getHistory(state).length;

export const getLastLocationInHistory = (state) => {
	const history = getHistory(state);
	return history[history.length - 1];
};

// --------------- Location queue---------------

export const getQueue = (state) => state.survey.queue;

export const getQueueLength = (state) => getQueue(state).length;

export const getNextLocationInQueue = (state) => {
	return getQueue(state)[0];
};

// --------------------- Data ---------------------

// Survey

export const getSurveyData = (state) => state.survey.data;

// Section

export const getSectionData = (state, sectionName) => {
	const survey = getSurveyData(state);
	return survey ? survey[sectionName] : null;
};

export const getCurrentSectionData = (state) => {
	const survey = getSurveyData(state);
	const sectionName = getCurrentSectionName(state);
	return survey ? survey[sectionName] : null;
};

export const getCurrentSectionTitle = (state) => {
	const section = getCurrentSectionData(state);
	return section ? section.title : null;
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

// --------------- Location objects ---------------

// Get an array of location objects from sectionName
export const getLocationsFromSection = (state, sectionName) => {
	const sectionData = getSectionData(state, sectionName);
	console.log({ sectionName, sectionData });
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
