import React from "react";
import { connect } from "react-redux";

import {
	getHistory,
	getSurveyData,
	getMaxAlertFromHistory,
} from "redux/survey/survey-selectors";

import Review from "./Review";

const mapStateToProps = (state) => ({
	history: getHistory(state),
	data: getSurveyData(state),
	alert: getMaxAlertFromHistory(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SurveyContainer = (props) => <Review {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
