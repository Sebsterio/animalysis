import React from "react";
import { connect } from "react-redux";

import { getClinic } from "redux/clinic/clinic-selectors";
import { modifyClinic } from "redux/clinic/clinic-actions";

import { ClinicForm } from "./ClinicForm";

const mapStateToProps = (state) => ({
	currentClinic: () => getClinic(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateClinic: (id, data) => dispatch(modifyClinic(id, data)),
});

const ClinicFormContainer = (props) => <ClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicFormContainer);
