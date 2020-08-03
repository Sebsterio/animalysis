import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestion,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
} from "redux/survey/survey-selectors";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestion(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
});

const mapDispatchToProps = (dispatch) => ({});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
