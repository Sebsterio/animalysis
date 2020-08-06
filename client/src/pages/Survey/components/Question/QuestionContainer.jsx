import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
	getCurrentQuestionAnswer,
} from "redux/survey/survey-selectors";
import {
	setAnswerInCurrentLocation,
	addAnswerInCurrentLocation,
} from "redux/survey/survey-actions";
import { addFollowUpToQueue } from "redux/survey/survey-operations";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestionData(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
	currentAnswer: getCurrentQuestionAnswer(state),
});

const mapDispatchToProps = (dispatch) => ({
	setAnswer: (data) => dispatch(setAnswerInCurrentLocation(data)),
	addAnswer: (data) => dispatch(addAnswerInCurrentLocation(data)),
	addFollowUpToQueue: (data) => dispatch(addFollowUpToQueue(data)),
});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
