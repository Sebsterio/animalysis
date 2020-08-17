import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
	getCurrentAnswerData,
	isAnswerSelected,
} from "redux/survey/survey-selectors";
import { handleAnswer } from "redux/survey/survey-operations";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestionData(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
	answer: getCurrentAnswerData(state),
	isAnswerSelected: (answer) => isAnswerSelected(state, answer),
});

const mapDispatchToProps = (dispatch) => ({
	handleAnswer: (data, history) => dispatch(handleAnswer(data, history)),
});

const QuestionContainer = (props) =>
	!!props.question ? <Question {...props} /> : null;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
