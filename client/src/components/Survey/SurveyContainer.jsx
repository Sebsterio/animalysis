import React from "react";
import { connect } from "react-redux";

import {
	getLocationHistory,
	getLastLandmark,
	getCurrentSequence,
	getCurrentSection,
	getCurrentQuestion,
	getNextLocationInSequence,
} from "redux/survey/survey-selectors";
import {
	submitAnswer,
	pushLocation,
	popLocation,
	pushLandmark,
	popLandmark,
} from "redux/survey/survey-actions";

import Survey from "./Survey";

const mapStateToProps = (state) => ({
	sequence: getCurrentSequence(state),
	section: getCurrentSection(state),
	question: getCurrentQuestion(state),
	locationHistory: getLocationHistory(state),
	lastLandmark: getLastLandmark(state),
	nextLocationInSequence: getNextLocationInSequence(state),
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
