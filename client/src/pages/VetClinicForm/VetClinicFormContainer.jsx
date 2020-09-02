import React from "react";
import { connect } from "react-redux";
import { withError } from "HOC";

import {
	getFormData,
	getIsRegistered,
	getIsUpdating,
} from "redux/clinic/clinic-selectors";
import {
	createOrganisation,
	updateOrganisation,
} from "redux/clinic/clinic-operations";

import { VetClinicForm } from "./VetClinicForm";

const mapStateToProps = (state) => ({
	currentData: getFormData(state),
	registered: getIsRegistered(state),
	updating: getIsUpdating(state),
});

const mapDispatchToProps = (dispatch) => ({
	create: (data) => dispatch(createOrganisation(data)),
	update: (data) => dispatch(updateOrganisation(data)),
});

const VetClinicFormContainer = (props) => <VetClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withError(VetClinicFormContainer));
