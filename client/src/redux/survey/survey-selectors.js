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

// --------------- Location queue---------------

export const getQueue = (state) => state.survey.queue;

export const getQueueLength = (state) => getQueue(state).length;

export const getNextLocation = (state) => {
	return getQueue(state)[0];
};

// Optional queue

export const getOptionalQueue = (state) => state.survey.optionalQueue;

export const getIsOptionalQueuePopulated = (state) =>
	!!getOptionalQueue(state).length;

// Initial optional queue

export const getInitialOptionalQueue = (state) =>
	state.survey.initialOptionalQueue;

// -------------------- Data ---------------------

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

// Get an array of location objects from sectionName
export const getLocationsFromSection = (state, sectionName) => {
	const sectionData = getSectionData(state, sectionName);
	return sectionData.questions.map((_, i) => ({
		sectionName,
		questionIndex: i,
	}));
};

// Map section names into location objects
export const getUnpackedQueue = (state, queue) => {
	const newQueue = [];
	queue.forEach((sectionName) =>
		newQueue.push(...getLocationsFromSection(state, sectionName))
	);
	return newQueue;
};

// Question

export const getQuestionData = (section, questionIndex) => {
	return section.questions[questionIndex];
};

export const getCurrentQuestionData = (state) => {
	const section = getCurrentSectionData(state);
	if (!section) return null;
	const questionIndex = getCurrentQuestionIndex(state);
	return getQuestionData(section, questionIndex);
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

// Answer

export const getAnswerData = (question, answer) => {
	if (typeof answer === "string") return answer;
	const answers = arrayify(answer).map(
		(answerIndex) => question.answers[answerIndex]
	);
	if (answers.length === 0) return null;
	if (answers.length === 1) return answers[0];
	return answers;
};

export const getCurrentAnswerData = (state) => {
	const question = getCurrentQuestionData(state);
	const answer = getCurrentQuestionAnswer(state);
	return getAnswerData(question, answer);
};

// Problem List

// Get an array with print and printNote values from answers given
export const getProblemListFromHistory = (state) =>
	getHistory(state)
		.map(({ sectionName, questionIndex, answer }) => {
			if (typeof answer === "string") return {};
			const section = getSectionData(state, sectionName);
			const question = getQuestionData(section, questionIndex);
			const answerData = getAnswerData(question, answer);
			return arrayify(answerData).map(({ print, printNote }) => {
				return { print, printNote };
			});
		})
		.flat()
		.filter((problem) => problem.print || problem.printNote);

// -------------------- Alert -------------------------

export const getCurrentAlert = (state) => state.survey.currentAlert;

export const getInitialAlert = (state) => state.survey.initialAlert;

const getAlertFromAnswer = (question, answer) =>
	arrayify(answer).reduce((accumulator, answer) => {
		const { alert } = getAnswerData(question, answer);
		return alert > accumulator ? alert : accumulator;
	}, 0);

// Calculate highest alert level raised by answers given so far
// Not using currentAlert prop as it deosn't get reverted on 'goBack' (intentionally)
export const getMaxAlertFromHistory = (state) =>
	getHistory(state).reduce((accumulator, location) => {
		const { sectionName, questionIndex, answer } = location;
		if (typeof answer === "string") return accumulator;
		const section = getSectionData(state, sectionName);
		const question = getQuestionData(section, questionIndex);
		const alert = getAlertFromAnswer(question, answer);
		return alert > accumulator ? alert : accumulator;
	}, getInitialAlert(state));

export const getIsRedAlertFromHistory = (state) =>
	getMaxAlertFromHistory(state) === 4;

// ---------------- Alert Modal ---------------------

export const getIsAlertModalActive = (state) => state.survey.alertModalActive;

// ---------------- Title ---------------------

export const getTitle = (state) => state.survey.title;

// ---------------- Title ---------------------

export const getPetId = (state) => state.survey.petId;

export const isPetIdActive = (state, id) => getPetId(state) === id;
