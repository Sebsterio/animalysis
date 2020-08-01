import React from "react";
import { connect } from "react-redux";

import { getSurveyData } from "redux/survey/survey-selectors";

import { submitAnswer } from "redux/survey/survey-actions";

import Survey from "./Survey";

const mapStateToProps = (state) => ({
	surveyData: getSurveyData(state),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
