import React from "react";
import { connect } from "react-redux";
import { getUserClinic } from "redux/user/user-selectors";
import { modifyUserClinic } from "redux/user/user-actions";

import { ClinicForm } from "./ClinicForm";

const mapStateToProps = (state) => ({
	currentClinic: () => getUserClinic(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateClinic: (id, data) => dispatch(modifyUserClinic(id, data)),
});

const ClinicFormContainer = (props) => <ClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicFormContainer);
