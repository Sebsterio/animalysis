import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
	getIsAnswerSelected,
} from "redux/survey/survey-selectors";
import { handleAnswer } from "redux/survey/survey-operations";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestionData(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
	isAnswerSelected: (answer) => getIsAnswerSelected(state, answer),
});

const mapDispatchToProps = (dispatch) => ({
	handleAnswer: (data) => dispatch(handleAnswer(data)),
});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
