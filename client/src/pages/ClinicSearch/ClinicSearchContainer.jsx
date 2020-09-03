import React from "react";
import { connect } from "react-redux";
import { withError } from "HOC";

import { getClinicId } from "redux/profile/profile-selectors";
import { ClinicSearch } from "./ClinicSearch";

const mapStateToProps = (state) => ({
	clinicId: getClinicId(state),
});

const mapDispatchToProps = (dispatch) => ({});

const ClinicSearchContainer = (props) => <ClinicSearch {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withError(ClinicSearchContainer));
