import React from "react";
import { connect } from "react-redux";

import {
	getLocationHistory,
	getLastLandmark,
	getCurrentSequenceName,
	getCurrentSection,
	getCurrentSectionIndex,
	getCurrentQuestion,
	getCurrentQuestionIndex,
	getNextLocationInSequence,
	getIsNextLocationInSequenceLandmarked,
} from "redux/survey/survey-selectors";
import {
	submitAnswer,
	pushLocation,
	popLocation,
	pushLandmark,
	popLandmark,
} from "redux/survey/survey-actions";

import { Survey } from "./Survey";

const mapStateToProps = (state) => ({
	sequenceName: getCurrentSequenceName(state),
	section: getCurrentSection(state),
	sectionIndex: getCurrentSectionIndex(state),
	question: getCurrentQuestion(state),
	questionIndex: getCurrentQuestionIndex(state),
	locationHistory: getLocationHistory(state),
	lastLandmark: getLastLandmark(state),
	nextLocationInSequence: getNextLocationInSequence(state),
	nextLocationInSequenceIsLandmarked: getIsNextLocationInSequenceLandmarked(
		state
	),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
	pushLocation: (data) => dispatch(pushLocation(data)),
	popLocation: () => dispatch(popLocation()),
	pushLandmark: (data) => dispatch(pushLandmark(data)),
	popLandmark: () => dispatch(popLandmark()),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
