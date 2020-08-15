import React from "react";
import { connect } from "react-redux";

import {} from "redux/survey/survey-selectors";

import Report from "./Report";

const mapStateToProps = (state) => ({
	// report: getReportsData(state),
});

const mapDispatchToProps = (dispatch) => ({});

const ReportContainer = (props) => <Report {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
