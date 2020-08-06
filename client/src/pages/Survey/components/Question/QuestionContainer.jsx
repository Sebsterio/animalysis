import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionIndex,
	getLastQuestionIndex,
} from "redux/survey/survey-selectors";

import Question from "./Question";

const mapStateToProps = (state) => ({
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, null)(QuestionContainer);
