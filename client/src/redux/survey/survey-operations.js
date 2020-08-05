import {
	getCurrentLocation,
	getUnpackedQueue,
	getNextLocationInQueue,
	getLastLocationInHistory,
	getLocationsFromSection,
} from "redux/survey/survey-selectors";
import * as $ from "redux/survey/survey-actions";

// Initialize survey store & set first question
// NOTE: don't save state in a var as actions are synchroneous
export const initSurvey = (surveyData) => (dispatch, getState) => {
	const { sections, mainQueue, optionalQueue } = surveyData;
	dispatch($.setSurveyData(sections));
	dispatch($.setQueue(getUnpackedQueue(getState(), mainQueue)));
	dispatch($.setOptionalQueue(optionalQueue));
	const nextLocation = getNextLocationInQueue(getState());
	dispatch($.setCurrentLocation(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

// Unshift current location into queue
// Pop last history location and set as current location
export const goBack = (history) => (dispatch, getState) => {
	const currentLocation = getCurrentLocation(getState());
	const previousLocation = getLastLocationInHistory(getState());
	if (!previousLocation) return history.goBack();
	dispatch($.unshiftLocationsToQueue({ newLocations: currentLocation }));
	dispatch($.setCurrentLocation(previousLocation));
	dispatch($.popLocationFromHistory());
};

// Push first queue location into location and location into history
export const goForward = (history) => (dispatch, getState) => {
	const currentLocation = getCurrentLocation(getState());
	const nextLocation = getNextLocationInQueue(getState());
	if (!nextLocation) return history.push("/new-report/review");
	dispatch($.pushLocationToHistory(currentLocation));
	dispatch($.setCurrentLocation(nextLocation));
	dispatch($.shiftNextLocationFromQueue());
};

// Extract questions from target section
// And questions to correct place in queue
// TODO: Remove target section from optionalQueue
export const addFollowUpToQueue = (followUp) => (dispatch, getState) => {
	const { priority, target, after } = followUp;
	const newLocations = getLocationsFromSection(getState(), target);
	switch (priority) {
		case 1:
			return dispatch($.unshiftLocationsToQueue({ newLocations }));
		case 2:
			return dispatch($.injectLocationsToQueue({ newLocations, after }));
		case 3:
			return dispatch($.pushLocationsToQueue({ newLocations }));
		default:
			return;
	}
	// TODO: remove section from optionalQueue
};
