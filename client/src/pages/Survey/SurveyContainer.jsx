import React from "react";
import { connect } from "react-redux";

import {
	getIsSurveyLoaded,
	getCurrentQuestionData,
	getCurrentQuestionAnswer,
} from "redux/survey/survey-selectors";
import {
	goForward,
	goBack,
	submitAnswer,
	addAnswer,
	removeAnswer,
} from "redux/survey/survey-operations";

import { Survey } from "./Survey";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
	currentQuestion: getCurrentQuestionData(state),
	currentAnswer: getCurrentQuestionAnswer(state),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
	addAnswer: (data) => dispatch(addAnswer(data)),
	removeAnswer: (data) => dispatch(removeAnswer(data)),
	goForward: (data) => dispatch(goForward(data)),
	goBack: (data) => dispatch(goBack(data)),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
