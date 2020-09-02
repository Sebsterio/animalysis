import React from "react";
import { connect } from "react-redux";

import {
	startRoutineCheck,
	startProblemReport,
} from "redux/survey/survey-operations";

import { VetSurvey } from "./VetSurvey";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, props) => ({
	startRoutineCheck: (data) => dispatch(startRoutineCheck(data, props.history)),
	startProblemReport: (data) =>
		dispatch(startProblemReport(data, props.history)),
});

const VetSurveyContainer = (props) => <VetSurvey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(VetSurveyContainer);
