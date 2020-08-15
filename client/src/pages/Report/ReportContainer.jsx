import React from "react";
import { connect } from "react-redux";

import {
	getReportById,
	getRecentReport,
} from "redux/reports/reports-selectors";

import Report from "./Report";

const mapStateToProps = (state) => ({
	getReport: (id) => getReportById(state, id),
	recentReport: getRecentReport(state),
});

const mapDispatchToProps = (dispatch) => ({});

const ReportContainer = (props) => <Report {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
