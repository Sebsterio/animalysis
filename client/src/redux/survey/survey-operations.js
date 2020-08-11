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

// Add followUp locations and go to next location in survey
export const handleGoForward = (history) => (dispatch) => {
	dispatch(processCurrentAnswer());
	dispatch(goForward(history));
};

// Remove all followUp locations and go to previous location in survey
export const handleGoBack = (history) => (dispatch) => {
	dispatch(goBack(history));
	dispatch(unprocessCurrentAnswer());
};

// Add followUp locations resulting from selected answers in current question
const processCurrentAnswer = () => (dispatch, getState) => {
	const currentAnswer = getCurrentAnswerData(getState());
	arrayify(currentAnswer).forEach((answer) => {
		const { followUp, alert } = answer;
		if (followUp) dispatch(addFollowUpToQueue({ followUp }));
		if (alert) console.log("ADD_ALERT (stub)"); // TEMP <<<<
	});
};

// Remove followUp locations resulting from selected answers in current question
const unprocessCurrentAnswer = () => (dispatch, getState) => {
	const currentAnswer = getCurrentAnswerData(getState());
	arrayify(currentAnswer).forEach((answer) => {
		const { followUp, alert } = answer;
		if (followUp) dispatch(removeFollowUpsFromQueue({ followUp }));
		if (alert) console.log("REMOVE_ALERT (stub)"); // TEMP <<<<
	});
};

// --------------------------- Navigation -------------------------------

// Pop last history location and unshift it into queue
// Quit survey if history empty
const goBack = (history) => (dispatch, getState) => {
	const currentLocation = getCurrentLocation(getState());
	const previousLocation = getPreviousLocation(getState());
	if (!previousLocation) return history.goBack();
	dispatch($.unshiftLocationsToQueue({ newLocations: currentLocation }));
	dispatch($.popLocationFromHistory());
};

// Push first queue location to history and shift it from queue
// End survey if queue empty
const goForward = (history) => (dispatch, getState) => {
	const nextLocation = getNextLocation(getState());
	if (!nextLocation) return history.push("/new-report/review");
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
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
// If answerIndex provided, only remove questions added by that answer
// Re-add sectionNames to optionalQueue if present in originalOptionalQueue
const removeFollowUpsFromQueue = ({ followUp }) => (dispatch, getState) => {
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	dispatch($.removeLocationsFromQueue({ historyIndex }));
	if (followUp) {
		const { target } = followUp;
		const originalOptionalQueue = getOriginalOptionalQueue(getState());
		if (originalOptionalQueue.includes(target))
			dispatch($.addToOptionalQueue(target));
	}
};
