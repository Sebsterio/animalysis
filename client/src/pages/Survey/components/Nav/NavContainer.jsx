import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getIsCurrentQuestionAnswered,
	getCurrentAnswerData,
} from "redux/survey/survey-selectors";
import {
	goForward,
	goBack,
	addFollowUpToQueue,
	removeFollowUpsFromQueue,
} from "redux/survey/survey-operations";

import { Nav } from "./Nav";

const mapStateToProps = (state) => ({
	currentQuestion: getCurrentQuestionData(state),
	questionIsAnswered: getIsCurrentQuestionAnswered(state),
	currentAnswer: getCurrentAnswerData(state),
});

const mapDispatchToProps = (dispatch) => ({
	goForward: (data) => dispatch(goForward(data)),
	goBack: (data) => dispatch(goBack(data)),
	addFollowUp: (data) => dispatch(addFollowUpToQueue(data)),
	removeFollowUps: (data) => dispatch(removeFollowUpsFromQueue(data)),
});

const NavContainer = (props) => <Nav {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
