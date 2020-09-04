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
	leaveOrganisation,
} from "redux/clinic/clinic-operations";
import { getEmail, getIsSuperuser } from "redux/user/user-selectors";

import { VetClinicForm } from "./VetClinicForm";

const mapStateToProps = (state) => ({
	currentData: getVetFormData(state),
	registered: getIsRegistered(state),
	updating: getIsUpdating(state),
	userEmail: getEmail(state),
	superuser: getIsSuperuser(state),
	isMember: getIsMember(state),
	isOwner: getIsAdmin(state),
	isAdmin: getIsOwner(state),
	isAllowedToDeleteMember: (email, role) =>
		getIsAllowedToDeleteMember(state, email, role),
});

const mapDispatchToProps = (dispatch) => ({
	create: (data) => dispatch(createOrganisation(data)),
	update: (data) => dispatch(updateOrganisation(data)),
	deleteClinic: (data) => dispatch(deleteOrganisation(data)),
	leaveClinic: () => dispatch(leaveOrganisation()),
});

const VetClinicFormContainer = (props) => <VetClinicForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withError(VetClinicFormContainer));
