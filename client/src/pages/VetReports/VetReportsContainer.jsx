import React from "react";
import { connect } from "react-redux";

import {
	setRows,
	toggleSeenHidden,
} from "redux/reports-history/reports-history-actions";
import {
	initTable,
	sortRows,
} from "redux/reports-history/reports-history-operations";
import { modifyReport } from "redux/pets/pets-operations";

import { VetReports } from "./VetReports";

// --------------------------------------------------------------

const mapStateToProps = ({ reportsHistory: { query, seenHidden } }) => ({
	query,
	seenHidden,
});

const mapDispatchToProps = (dispatch) => ({
	initTable: (data) => dispatch(initTable(data)),
	sortRows: (data) => dispatch(sortRows(data)),
	modifyReport: (data) => dispatch(modifyReport(data)),
	setRows: (data) => dispatch(setRows(data)),
	toggleSeenHidden: (data) => dispatch(toggleSeenHidden(data)),
});

const VetReportsContainer = (props) => <VetReports {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VetReportsContainer);
