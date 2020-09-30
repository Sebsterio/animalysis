import React from "react";
import { connect } from "react-redux";
import { withError } from "HOC";

import {
	getVetFormData,
	getIsRegistered,
	getIsUpdating,
	getIsMember,
	getIsAdmin,
	getIsOwner,
	getIsAllowedToDeleteMember,
} from "redux/clinic/clinic-selectors";
import {
	createOrganisation,
	updateOrganisation,
	deleteOrganisation,
	leaveClinic,
} from "redux/clinic/clinic-operations";
import { getEmail, getIsSuperuser, getIsDemo } from "redux/user/user-selectors";

import { VetClinicForm } from "./VetClinicForm";

const mapStateToProps = (state) => ({
	currentData: getVetFormData(state),
	registered: getIsRegistered(state),
	updating: getIsUpdating(state),
	userEmail: getEmail(state),
	isSuperuser: getIsSuperuser(state),
	isDemo: getIsDemo(state),
	isMember: getIsMember(state),
	isOwner: getIsOwner(state),
	isAdmin: getIsAdmin(state),
	isAllowedToDeleteMember: (email, role) =>
		getIsAllowedToDeleteMember(state, email, role),
});

const mapDispatchToProps = (dispatch) => ({
	create: (data) => dispatch(createOrganisation(data)),
	update: (data) => dispatch(updateOrganisation(data)),
	deleteClinic: (data) => dispatch(deleteOrganisation(data)),
	leaveClinic: () => dispatch(leaveClinic()),
});

const VetClinicFormContainer = (props) => <VetClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withError(VetClinicFormContainer));
