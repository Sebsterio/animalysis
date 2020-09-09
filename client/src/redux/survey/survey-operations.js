import shortid from "shortid";
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
	getTitle,
	getPetId,
} from "redux/survey/survey-selectors";
import * as $ from "redux/survey/survey-actions";
import { addReportToPet } from "redux/pets/pets-operations";
import { getPersonalizedSurveyData } from "./survey-utils";
import { arrayify } from "utils/array";

// TEMP
export const callClinic = () => (dispatch) => alert("CALL_CLINIC--STUB");

// --------------------- Initialization -------------------------

export const startRoutineCheck = (pet, history) => (dispatch, getState) => {
	const data = {
		...getPersonalizedSurveyData(getState, pet),
		petId: pet.id,
		alert: 0,
		title: "Routine Health Check",
	};
	dispatch(initSurvey(data, history));
};

// Add primer section to mainQueue and set alert to green
export const startProblemReport = (pet, history) => (dispatch, getState) => {
	const data = {
		...getPersonalizedSurveyData(getState, pet),
		petId: pet.id,
		alert: 1,
		title: "New Problem",
	};
	const { primerQueue, mainQueue } = data;
	data.mainQueue = [...primerQueue, ...mainQueue];
	dispatch(initSurvey(data, history));
};

// Initialize survey store & set first question
const initSurvey = (data, history) => (dispatch, getState) => {
	const { petId, sections, mainQueue, optionalQueue, alert, title } = data;
	dispatch($.clear());
	dispatch($.setPetId(petId));
	dispatch($.setSurveyData(sections));
	dispatch($.setQueue(getUnpackedQueue(getState(), mainQueue))); // after data
	dispatch($.setOptionalQueue(optionalQueue));
	dispatch($.setInitialOptionalQueue(optionalQueue));
	dispatch($.setCurrentAlert(alert));
	dispatch($.setInitialAlert(alert));
	if (title) dispatch($.setTitle(title));
	history.push("/analysis");
	dispatch(goForward(history));
};

export const initOptionalSurvey = (history) => (dispatch, getState) => {
	const optionalQueue = getOptionalQueue(getState());
	dispatch($.setQueue(getUnpackedQueue(getState(), optionalQueue)));
	dispatch($.clearOptionalQueue());
	dispatch($.clearInitialOptionalQueue());
	history.replace("/analysis");
	dispatch(goForward(history));
};

// --------------------- Termination -------------------------

export const endSurvey = (history) => (dispatch) => {
	const reportId = shortid.generate();
	dispatch(generateReport({ reportId }));
	dispatch($.clear());
	history.replace(`/report/${reportId}`);
};

const generateReport = ({ reportId }) => (dispatch, getState) => {
	const state = getState();
	dispatch(
		addReportToPet({
			id: reportId,
			petId: getPetId(state),
			dateCreated: new Date(),
			title: getTitle(state),
			alert: getMaxAlertFromHistory(state),
			problemList: getProblemListFromHistory(state),
		})
	);
};

// ----------------------- Answer ---------------------------

// Set/add/remove answer in current location depending on question type
export const handleAnswer = (data, history) => (dispatch, getState) => {
	const currentQuestion = getCurrentQuestionData(getState());
	const { type } = currentQuestion;
	const { answerIndex, isSelected, answer, setsTitle } = data;
	if (type === "text") {
		dispatch($.setAnswerInCurrentLocation(answer));
		if (setsTitle) dispatch($.setTitle(answer));
	} else if (type === "select-one") {
		dispatch($.setAnswerInCurrentLocation(answerIndex));
		dispatch(handleGoForward(history));
	} else if (type === "select-multiple") {
		if (!isSelected) dispatch($.addAnswerInCurrentLocation(answerIndex));
		else dispatch($.removeAnswerFromCurrentLocation(answerIndex));
	}
};

// --------------------------- Navigation -----------------------------

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
	arrayify(currentAnswer).forEach((answer) => {
		const { followUp } = answer;
		if (followUp) dispatch(removeFollowUpsFromQueue({ followUp }));
	});
};

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

// -------------------------- ALert Popup -----------------------------

// Open warning popup if alert reached level 2 (only once through entire survey)
const handleAlert = (alert) => (dispatch, getState) => {
	const currentAlert = getCurrentAlert(getState());
	if (alert <= currentAlert) return;
	dispatch($.setCurrentAlert(alert));
	if (alert === 3) dispatch($.activateAlertModal());
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

			if (after[0] === "all") dispatch($.pushLocationsToQueue({ newLocations }));
			else if (after[0] === "none") dispatch($.unshiftLocationsToQueue({ newLocations }));
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
