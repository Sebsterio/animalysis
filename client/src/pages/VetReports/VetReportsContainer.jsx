import React from "react";
import { connect } from "react-redux";

import { getAllReportsAugmented } from "redux/pets/pets-selectors";
import { modifyReport } from "redux/pets/pets-operations";

import { VetReports } from "./VetReports";

// --------------------------------------------------------------

const mapStateToProps = (state) => ({
	reports: getAllReportsAugmented(state),
});

const mapDispatchToProps = (dispatch) => ({
	modifyReport: (data) => dispatch(modifyReport(data)),
});

const VetReportsContainer = (props) => <VetReports {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VetReportsContainer);
