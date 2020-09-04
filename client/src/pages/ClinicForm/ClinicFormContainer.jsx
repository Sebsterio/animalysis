import React from "react";
import { connect } from "react-redux";

import { getFormData, getIsRegistered } from "redux/clinic/clinic-selectors";
import { updateClinic, leaveClinic } from "redux/clinic/clinic-operations";

import { ClinicForm } from "./ClinicForm";

const mapStateToProps = (state) => ({
	currentClinic: getFormData(state),
	clinicRegistered: getIsRegistered(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateClinic: (data) => dispatch(updateClinic(data)),
	leaveClinic: (data) => dispatch(leaveClinic(data)),
});

const ClinicFormContainer = (props) => <ClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicFormContainer);
