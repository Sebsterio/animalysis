import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
} from "redux/survey/survey-selectors";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestionData(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
});

const mapDispatchToProps = (dispatch) => ({});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
