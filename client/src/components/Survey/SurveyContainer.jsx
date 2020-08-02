import React from "react";
import { connect } from "react-redux";

import {
	getLocation,
	getCurrentLocation,
	getCurrentSequence,
	getCurrentSection,
	getCurrentQuestion,
} from "redux/survey/survey-selectors";
import {
	submitAnswer,
	setLocation,
	pushLocation,
	popLocation,
} from "redux/survey/survey-actions";

import Survey from "./Survey";

const mapStateToProps = (state) => ({
	location: getLocation(state),
	currentLocation: getCurrentLocation(state),
	sequence: getCurrentSequence(state),
	section: getCurrentSection(state),
	question: getCurrentQuestion(state),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
	setLocation: (data) => dispatch(setLocation(data)),
	pushLocation: (data) => dispatch(pushLocation(data)),
	popLocation: () => dispatch(popLocation()),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
