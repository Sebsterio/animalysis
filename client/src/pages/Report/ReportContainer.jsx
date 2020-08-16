import React from "react";
import { connect } from "react-redux";

import { getReportById } from "redux/pets/pets-selectors";

import Report from "./Report";

const mapStateToProps = (state) => ({
	getReport: (id) => getReportById(state, id),
});

const mapDispatchToProps = (dispatch) => ({});

const ReportContainer = (props) => <Report {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
