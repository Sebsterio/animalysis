import React from "react";
import { connect } from "react-redux";

import {
	getHistory,
	getSurveyData,
	getMaxAlertFromHistory,
} from "redux/survey/survey-selectors";

import Report from "./Report";

const mapStateToProps = (state) => ({
	history: getHistory(state),
	data: getSurveyData(state),
	alert: getMaxAlertFromHistory(state),
});

const mapDispatchToProps = (dispatch) => ({});

const ReportContainer = (props) => <Report {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
