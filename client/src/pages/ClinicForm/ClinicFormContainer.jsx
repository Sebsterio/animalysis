import React from "react";
import { connect } from "react-redux";

import { getFormData } from "redux/clinic/clinic-selectors";
import { updateClinic } from "redux/clinic/clinic-operations";

import { ClinicForm } from "./ClinicForm";

const mapStateToProps = (state) => ({
	currentClinic: getFormData(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateClinic: (data) => dispatch(updateClinic(data)),
});

const ClinicFormContainer = (props) => <ClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicFormContainer);
