import {
	getCurrentLocation,
	getCurrentLocationHistoryIndex,
	getUnpackedQueue,
	getNextLocation,
	getPreviousLocation,
	getLocationsFromSection,
	getInitialOptionalQueue,
	getCurrentQuestionData,
	getCurrentAnswerData,
	getCurrentAlert,
	getIsRedAlertFromHistory,
	getOptionalQueue,
	getIsOptionalQueuePopulated,
	getProblemListFromHistory,
	getMaxAlertFromHistory,
} from "redux/survey/survey-selectors";
import * as $ from "redux/survey/survey-actions";
import { addReportToList } from "redux/reports/reports-actions";
import { arrayify } from "utils/array";

// ----------------------- Compound operations ---------------------------

// Initialize survey store & set first question
export const initSurvey = (data) => (dispatch, getState) => {
	const { sections, mainQueue, optionalQueue, alert } = data;
	dispatch($.clearSurvey());
	dispatch($.setSurveyData(sections));
	dispatch($.setQueue(getUnpackedQueue(getState(), mainQueue)));
	dispatch($.setOptionalQueue(optionalQueue));
	dispatch($.setInitialOptionalQueue(optionalQueue));
	dispatch($.setCurrentAlert(alert));
	dispatch($.setInitialAlert(alert));
	const nextLocation = getNextLocation(getState());
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

export const initOptionalSurvey = (history) => (dispatch, getState) => {
	const optionalQueue = getOptionalQueue(getState());
	dispatch($.setQueue(getUnpackedQueue(getState(), optionalQueue)));
	dispatch($.clearOptionalQueue());
	dispatch($.clearInitialOptionalQueue());
	history.push("/analysis");
	dispatch(goForward(history));
};

// WORK IN PROGRESS
export const endSurvey = (history) => (dispatch, getState) => {
	dispatch(generateReport());
	dispatch($.clearSurvey());
	history.replace("/analysis/report");
};

export const generateReport = () => (dispatch, getState) => {
	const state = getState();
	const problemList = getProblemListFromHistory(state);
	const alert = getMaxAlertFromHistory(state);
	dispatch(addReportToList({ problemList, alert }));
};

// TEMP
export const callClinic = () => alert("CALL_CLINIC--STUB");

// Set/add/remove answer in current location depending on question type
export const handleAnswer = (data, history) => (dispatch, getState) => {
	const currentQuestion = getCurrentQuestionData(getState());
	const { type } = currentQuestion;
	const { answerIndex, isSelected } = data;
	if (type === "select-one") {
		dispatch($.setAnswerInCurrentLocation(answerIndex));
		dispatch(handleGoForward(history));
	} else if (type === "select-multiple") {
		if (!isSelected) dispatch($.addAnswerInCurrentLocation(answerIndex));
		else dispatch($.removeAnswerFromCurrentLocation(answerIndex));
	}
};

// Add followUp locations resulting from selected answers in current question
// Go to next location in survey
export const handleGoForward = (history) => (dispatch, getState) => {
	const currentAnswer = getCurrentAnswerData(getState());
	arrayify(currentAnswer).forEach((answer) => {
		const { followUp, alert } = answer;
		if (followUp) dispatch(addFollowUpToQueue({ followUp }));
		if (alert) dispatch(handleAlert(alert, history));
	});
	dispatch(goForward(history));
};

// Remove followUp locations resulting from selected answers in previous question
// Go to previous location in survey
export const handleGoBack = (history) => (dispatch, getState) => {
	dispatch(goBack(history)); // must run first
	const currentAnswer = getCurrentAnswerData(getState());
	console.log(currentAnswer);
	arrayify(currentAnswer).forEach((answer) => {
		const { followUp } = answer;
		if (followUp) dispatch(removeFollowUpsFromQueue({ followUp }));
	});
};

// -------------------------- ALert Popup -----------------------------

// Open warning popup if alert reached level 2 (only once through entire survey)
const handleAlert = (alert) => (dispatch, getState) => {
	const currentAlert = getCurrentAlert(getState());
	if (alert <= currentAlert) return;
	dispatch($.setCurrentAlert(alert));
	if (alert === 3) dispatch($.activateAlertModal());
};

// --------------------------- Navigation -----------------------------

// Push first queue location to history and shift it from queue
// End survey if queue empty or alert reached level 3
const goForward = (history) => (dispatch, getState) => {
	const nextLocation = getNextLocation(getState());
	if (!nextLocation)
		return getIsOptionalQueuePopulated(getState())
			? history.push("/analysis/summary")
			: dispatch(endSurvey(history));
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
	const isRedAlert = getIsRedAlertFromHistory(getState());
	if (isRedAlert) history.push("/analysis/summary");
};

// Pop last history location and unshift it into queue
// Quit survey if history empty
const goBack = (history) => (dispatch, getState) => {
	const currentLocation = getCurrentLocation(getState());
	const previousLocation = getPreviousLocation(getState());
	if (!previousLocation) return history.goBack();
	dispatch($.unshiftLocationsToQueue({ newLocations: currentLocation }));
	dispatch($.popLocationFromHistory());
};

// ------------------------- Follow Ups ---------------------------------

// Extract locations from target section(s)
// add info about invoking (this) location to each extracted location
// Insert extracted locations into correct place in queue
// Remove target section(s) from optionalQueue
/* prettier-ignore */
const addFollowUpToQueue = ({ followUp, answerIndex }) => (dispatch, getState) => {
	const { target, after } = followUp;
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	const addedBy = { historyIndex, answerIndex }
	const addProps = (location) => ({	...location, addedBy });

	arrayify(target)
		.reverse()
		.forEach((target) => {
			let newLocations = getLocationsFromSection(getState(), target);
			newLocations = newLocations.map(addProps);

			if (after === "all") dispatch($.pushLocationsToQueue({ newLocations }));
			else if (!after) dispatch($.unshiftLocationsToQueue({ newLocations }));
			else dispatch($.injectLocationsToQueue({ newLocations, after }));

			dispatch($.removeFromOptionalQueue(target));
		});
};

// Remove locations addedBy questions at given historyIndex
// Re-add sectionNames to optionalQueue if present in initialOptionalQueue
const removeFollowUpsFromQueue = ({ followUp }) => (dispatch, getState) => {
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	const initialOptionalQueue = getInitialOptionalQueue(getState());
	const { target } = followUp;

	dispatch($.removeLocationsFromQueue({ historyIndex }));
	arrayify(target).forEach((target) => {
		if (initialOptionalQueue.includes(target))
			dispatch($.addToOptionalQueue(target));
	});
};
