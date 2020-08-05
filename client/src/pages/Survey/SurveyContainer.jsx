import React from "react";
import { connect } from "react-redux";

import {
	getIsCurrentQuestionAnswered,
	getIsSurveyLoaded,
} from "redux/survey/survey-selectors";
import { addAnswerToCurrentLocation } from "redux/survey/survey-actions";
import {
	initSurvey,
	addFollowUpToQueue,
	goForward,
	goBack,
} from "redux/survey/survey-operations";

import { Survey } from "./Survey";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
	questionIsAnswered: getIsCurrentQuestionAnswered(state),
});

const mapDispatchToProps = (dispatch) => ({
	initSurvey: (data) => dispatch(initSurvey(data)),
	addAnswer: (data) => dispatch(addAnswerToCurrentLocation(data)),
	addFollowUpToQueue: (data) => dispatch(addFollowUpToQueue(data)),
	goForward: (data) => dispatch(goForward(data)),
	goBack: (data) => dispatch(goBack(data)),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
