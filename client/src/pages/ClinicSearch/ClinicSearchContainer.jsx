import React from "react";
import { connect } from "react-redux";

import { getIsVet, getIsDemo } from "redux/user/user-selectors";
import { getClinicId } from "redux/profile/profile-selectors";
import { getIsRegistered } from "redux/clinic/clinic-selectors";
import { fetchClinics, joinClinic } from "redux/clinic/clinic-operations";

import { ClinicSearch } from "./ClinicSearch";

const mapStateToProps = (state) => ({
	isVet: getIsVet(state),
	hasClinic: getIsRegistered(state),
	clinicId: getClinicId(state),
	isDemo: getIsDemo(state),
});

const mapDispatchToProps = (dispatch) => ({
	fetchClinics: (data) => dispatch(fetchClinics(data)),
	joinClinic: (data) => dispatch(joinClinic(data)),
});

const ClinicSearchContainer = (props) => <ClinicSearch {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicSearchContainer);
