import React from "react";
import { connect } from "react-redux";

import {
	getSurveyData,
	getSurveyPageStack,
} from "redux/survey/survey-selectors";

import Survey from "./Survey";

const mapStateToProps = (state) => ({
	surveyData: getSurveyData(state),
	pageStack: getSurveyPageStack(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
