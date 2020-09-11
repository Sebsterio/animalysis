import React from "react";
import { connect } from "react-redux";

import { getIsSuperuser } from "redux/user/user-selectors";
import { getName, getIsLoading } from "redux/profile/profile-selectors";
import { getFormData, getIsRegistered } from "redux/clinic/clinic-selectors";
import {
	getAllUnseenReports,
	getIsSyncing,
	getAreAnyPetsSyncing,
} from "redux/pets/pets-selectors";
import { modifyReport } from "redux/pets/pets-operations";

import { VetDashboard } from "./VetDashboard";

// --------------------------------------------------------------

const mapStateToProps = (state) => ({
	username: getName(state),
	profileLoading: getIsLoading(state),
	clinic: getFormData(state),
	hasClinic: getIsRegistered(state),
	reports: getAllUnseenReports(state),
	superuser: getIsSuperuser(state),
	syncing: getIsSyncing(state) || getAreAnyPetsSyncing(state),
});

const mapDispatchToProps = (dispatch) => ({
	modifyReport: (data) => dispatch(modifyReport(data)),
});

const VetDashboardContainer = (props) => <VetDashboard {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VetDashboardContainer);
