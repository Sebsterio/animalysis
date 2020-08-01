import React from "react";
import { connect } from "react-redux";

import { getSurveyData, getReturnStack } from "redux/survey/survey-selectors";
import { pushToStack, popFromStack } from "redux/survey/survey-actions";
import { submitAnswer } from "redux/survey/survey-actions";

import Survey from "./Survey";

const mapStateToProps = (state) => ({
	surveyData: getSurveyData(state),
	returnStack: getReturnStack(state),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
	pushToStack: (data) => dispatch(pushToStack(data)),
	popFromStack: () => dispatch(popFromStack()),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
