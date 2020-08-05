import {
	getCurrentLocation,
	getUnpackedQueue,
	getNextLocationInQueue,
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

// Unshift last history location into current location and current into queue
export const goBack = () => (dispatch, getState) => {
	console.log("GO_BACK"); /////////
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

// Extract questions from section redirect-to and add them to correct place in queue
export const addFollowUpToQueue = (redirect) => (dispatch, getState) => {
	const { priority, target, after } = redirect;
	const newQuestions = getLocationsFromSection(getState(), target);
	switch (priority) {
		case 1:
			return dispatch($.unshiftLocationsToQueue({ newQuestions }));
		case 2:
			return dispatch($.injectLocationsToQueue({ newQuestions, after }));
		case 3:
			return dispatch($.pushLocationsToQueue({ newQuestions }));
	}
	// TODO: remove section from optionalQueue
};
