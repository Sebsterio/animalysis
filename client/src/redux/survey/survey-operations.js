import {
	getCurrentLocation,
	getCurrentLocationHistoryIndex,
	getUnpackedQueue,
	getNextLocation,
	getPreviousLocation,
	getLocationsFromSection,
	getOriginalOptionalQueue,
	getCurrentQuestionData,
	getCurrentAnswerData,
} from "redux/survey/survey-selectors";
import * as $ from "redux/survey/survey-actions";
import { arrayify } from "utils/array";

// Initialize survey store & set first question
// NOTE: don't save state in a var as actions are synchroneous
export const initSurvey = (surveyData) => (dispatch, getState) => {
	const { sections, mainQueue, optionalQueue } = surveyData;
	dispatch($.setSurveyData(sections));
	dispatch($.setQueue(getUnpackedQueue(getState(), mainQueue)));
	dispatch($.setOptionalQueue(optionalQueue));
	dispatch($.setOriginalOptionalQueue(optionalQueue));
	const nextLocation = getNextLocation(getState());
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

// ----------------------- Compound operations ---------------------------

// Go to previous location in survey
// Remove all followUp locations added by current question
export const handleGoBack = (history) => (dispatch, getState) => {
	dispatch(goBack(history));
	const currentAnswer = getCurrentAnswerData(getState());
	arrayify(currentAnswer).forEach((answer) => {
		const { followUp, alert } = answer;
		if (followUp)
			dispatch(removeFollowUpsFromQueue({ followUp, answerIndex: null }));
		if (alert) console.log("REMOVE_ALERT (stub)"); // TEMP <<<<
	});
};

// Go to next location in survey
// Re-add followUp locations resulting from previously selected answer
export const handleGoForward = (history) => (dispatch, getState) => {
	const currentQuestion = getCurrentQuestionData(getState());
	const currentAnswer = getCurrentAnswerData(getState());
	const { type } = currentQuestion;
	if (type === "select-one") {
		const { followUp, alert } = currentAnswer;
		if (followUp) dispatch(addFollowUpToQueue({ followUp }));
		if (alert) console.log("ADD_ALERT (stub)"); // TEMP <<<<
	}
	dispatch(goForward(history));
	// TODO: handle 'select-multiple' type (arrayify)
};

export const handleAnswer = (data, history) => (dispatch, getState) => {
	const currentQuestion = getCurrentQuestionData(getState());
	const { type } = currentQuestion;
	const { isSelected } = data;
	if (type === "select-one") {
		dispatch(submitAnswer(data));
		dispatch(goForward(history));
	} else if (type === "select-multiple") {
		if (!isSelected) dispatch(addAnswer(data));
		else dispatch(removeAnswer(data));
	}
};

// --------------------------- Navigation -------------------------------

// Pop last history location and unshift it into queue
// Quit survey if history empty
export const goBack = (history) => (dispatch, getState) => {
	const currentLocation = getCurrentLocation(getState());
	const previousLocation = getPreviousLocation(getState());
	if (!previousLocation) return history.goBack();
	dispatch($.unshiftLocationsToQueue({ newLocations: currentLocation }));
	dispatch($.popLocationFromHistory());
};

// Push first queue location to history and shift it from queue
// End survey if queue empty
export const goForward = (history) => (dispatch, getState) => {
	const nextLocation = getNextLocation(getState());
	if (!nextLocation) return history.push("/new-report/review");
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

// -------------------------- Answer --------------------------------

// Set answer if different to current AND add followUp locations to queue
/* prettier-ignore */
export const submitAnswer = ({ answerIndex, followUp, alert }) => (dispatch) => {
	dispatch($.setAnswerInCurrentLocation(answerIndex));
	if (followUp) dispatch(addFollowUpToQueue({ followUp }));
};

// Add another answer to current location AND add followUp locations to queue
export const addAnswer = ({ answerIndex, followUp, alert }) => (dispatch) => {
	dispatch($.addAnswerInCurrentLocation(answerIndex));
	if (followUp) dispatch(addFollowUpToQueue({ followUp, answerIndex }));
};

// Remove answer from current location
// Remove followUp locations resulting from the removed answer from queue
/* prettier-ignore */
export const removeAnswer = ({ answerIndex, followUp, alert }) => (dispatch) => {
	dispatch($.removeAnswerFromCurrentLocation(answerIndex));
	if (followUp) dispatch(removeFollowUpsFromQueue({ followUp, answerIndex }));
};

// ------------------------- Follow Up ---------------------------------

// Extract locations from target section(s)
// add info about invoking (this) location to each extracted location
// Insert extracted locations into correct place in queue
// Remove target section(s) from optionalQueue
/* prettier-ignore */
export const addFollowUpToQueue = ({ followUp, answerIndex }) => (dispatch, getState) => {
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
// If answerIndex provided, only remove questions added by that answer
// Re-add sectionNames to optionalQueue if present in originalOptionalQueue
/* prettier-ignore */
export const removeFollowUpsFromQueue = ({ followUp, answerIndex }) => (dispatch,	getState) => {
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	dispatch($.removeLocationsFromQueue({ historyIndex, answerIndex }));
	if (followUp) {
		const { target } = followUp;
		const originalOptionalQueue = getOriginalOptionalQueue(getState())
		if (originalOptionalQueue.includes(target)) dispatch($.addToOptionalQueue(target));
	}
};
