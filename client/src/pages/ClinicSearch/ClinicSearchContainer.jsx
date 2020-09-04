import React from "react";
import { connect } from "react-redux";
import { withError } from "HOC";

import { getClinicId } from "redux/profile/profile-selectors";
import { fetchClinics } from "redux/clinic/clinic-operations";

import { ClinicSearch } from "./ClinicSearch";

const mapStateToProps = (state) => ({
	clinicId: getClinicId(state),
});

const mapDispatchToProps = (dispatch) => ({
	fetchClinics: (data) => dispatch(fetchClinics(data)),
});

const ClinicSearchContainer = (props) => <ClinicSearch {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withError(ClinicSearchContainer));
