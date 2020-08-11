import { isEmpty } from "utils/object";
import { arrayify } from "utils/array";

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

export const getCurrentSectionName = (state) => {
	const location = getCurrentLocation(state);
	return location ? location.sectionName : null;
};

export const getCurrentQuestionIndex = (state) => {
	const location = getCurrentLocation(state);
	return location ? location.questionIndex : null;
};

export const getCurrentQuestionAnswer = (state) => {
	const location = getCurrentLocation(state);
	return location ? location.answer : null;
};

export const getIsCurrentQuestionAnswered = (state) => {
	const answer = getCurrentQuestionAnswer(state);
	if (Array.isArray(answer)) return !!answer.length;
	return answer !== null && answer !== undefined;
};

export const isAnswerSelected = (state, answer) => {
	const currentAnswers = arrayify(getCurrentQuestionAnswer(state));
	return currentAnswers.some((currentAnswer) => currentAnswer === answer);
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
	if (!section) return null;
	const questionIndex = getCurrentQuestionIndex(state);
	const question = section.questions[questionIndex];
	if (typeof question === "function") return question(getCurrentPet(state));
	return question;
};

// Answer

// ASSUMPTION: queston type === 'select-one'
export const getCurrentAnswerData = (state) => {
	const question = getCurrentQuestionData(state);
	const answer = getCurrentQuestionAnswer(state);
	return question.answers[answer];
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
