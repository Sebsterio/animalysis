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
	if (followUp) dispatch(removeFollowUpsFromQueue({ answerIndex }));
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
/* prettier-ignore */
export const removeFollowUpsFromQueue = ({ answerIndex }) => (dispatch,	getState) => {
	const historyIndex = getCurrentLocationHistoryIndex(getState());
	dispatch($.removeLocationsFromQueue({ historyIndex, answerIndex }));
};
