import React from "react";
import { connect } from "react-redux";

import { getFormData, getIsRegistered } from "redux/clinic/clinic-selectors";
import { updateClinicInfo, leaveClinic } from "redux/clinic/clinic-operations";
import { getIsDemo } from "redux/user/user-selectors";

import { ClinicForm } from "./ClinicForm";

const mapStateToProps = (state) => ({
	currentClinic: getFormData(state),
	clinicRegistered: getIsRegistered(state),
	isDemo: getIsDemo(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateClinicInfo: (data) => dispatch(updateClinicInfo(data)),
	leaveClinic: (data) => dispatch(leaveClinic(data)),
});

const ClinicFormContainer = (props) => <ClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicFormContainer);
