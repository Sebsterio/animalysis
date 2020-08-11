import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
	isAnswerSelected,
} from "redux/survey/survey-selectors";
import {
	submitAnswer,
	addAnswer,
	removeAnswer,
	goForward,
} from "redux/survey/survey-operations";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestionData(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
	isAnswerSelected: (answer) => isAnswerSelected(state, answer),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
	addAnswer: (data) => dispatch(addAnswer(data)),
	removeAnswer: (data) => dispatch(removeAnswer(data)),
	goForward: (data) => dispatch(goForward(data)),
});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
