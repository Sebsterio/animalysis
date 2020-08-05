import React from "react";
import { connect } from "react-redux";

import {
	getIsHistoryEmpty,
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
	historyIsEmpty: getIsHistoryEmpty(state),
	isQuestionAnswered: getIsCurrentQuestionAnswered(state),
});

const mapDispatchToProps = (dispatch) => ({
	initSurvey: (data) => dispatch(initSurvey(data)),
	addAnswer: (data) => dispatch(addAnswerToCurrentLocation(data)),
	addFollowUpToQueue: (data) => dispatch(addFollowUpToQueue(data)),
	goForward: () => dispatch(goForward()),
	goBack: () => dispatch(goBack()),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
