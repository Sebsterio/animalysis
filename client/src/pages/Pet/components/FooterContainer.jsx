import React from "react";
import { connect } from "react-redux";

import { isPetIdActive } from "redux/survey/survey-selectors";
import {
	startRoutineCheck,
	startProblemReport,
} from "redux/survey/survey-operations";

import { Footer } from "./Footer";

const mapStateToProps = (state) => ({
	isPetIdActive: (id) => isPetIdActive(state, id),
});

const mapDispatchToProps = (dispatch, props) => ({
	startRoutineCheck: (data) => dispatch(startRoutineCheck(data, props.history)),
	startProblemReport: (data) =>
		dispatch(startProblemReport(data, props.history)),
});

const FooterContainer = (props) => <Footer {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
