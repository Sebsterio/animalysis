import {
	getCurrentLocation,
	getCurrentLocationHistoryIndex,
	getUnpackedQueue,
	getNextLocation,
	getPreviousLocation,
	getLocationsFromSection,
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
	const nextLocation = getNextLocation(getState());
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

// Unshift current location into queue
// Pop last history location and set as current location
// Remove all followUp locations added by current question
export const goBack = (history) => (dispatch, getState) => {
	const currentLocation = getCurrentLocation(getState());
	const previousLocation = getPreviousLocation(getState());
	if (!previousLocation) return history.goBack();
	dispatch($.unshiftLocationsToQueue({ newLocations: currentLocation }));
	dispatch($.popLocationFromHistory());
	dispatch(removeFollowUpsFromQueue({ answerIndex: null /* any answer */ }));
};

// Push first queue location into location and location into history
export const goForward = (history) => (dispatch, getState) => {
	const nextLocation = getNextLocation(getState());
	if (!nextLocation) return history.push("/new-report/review");
	dispatch($.pushLocationToHistory(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

// Extract locations from target section(s)
// add info about invoking (this) location to each extracted location
// Insert extracted locations into correct place in queue
// Remove target section(s) from optionalQueue
export const addFollowUpToQueue = ({ followUp, answerIndex }) => (
	dispatch,
	getState
) => {
	const { target, after } = followUp;
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	const addProps = (location) => ({
		...location,
		addedBy: { historyIndex, answerIndex },
	});
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
export const removeFollowUpsFromQueue = ({ answerIndex }) => (
	dispatch,
	getState
) => {
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	dispatch($.removeLocationsFromQueue({ historyIndex, answerIndex }));
};

// Set answer if different the current AND add followUp locations to queue
export const submitAnswer = ({ answerIndex, followUp, alert }) => (
	dispatch
) => {
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
export const removeAnswer = ({ answerIndex, followUp, alert }) => (
	dispatch
) => {
	dispatch($.removeAnswerFromCurrentLocation(answerIndex));
	if (followUp) dispatch(removeFollowUpsFromQueue({ answerIndex }));
};
