import React from "react";
import { connect } from "react-redux";

import { getName, getIsLoading } from "redux/profile/profile-selectors";
import { getFormData, getIsRegistered } from "redux/clinic/clinic-selectors";

import { VetDashboard } from "./VetDashboard";

// --------------------------------------------------------------

const mapStateToProps = (state) => ({
	username: getName(state),
	profileLoading: getIsLoading(state),
	clinic: getFormData(state),
	hasClinic: getIsRegistered(state),
});

const mapDispatchToProps = (dispatch) => ({});

const VetDashboardContainer = (props) => <VetDashboard {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VetDashboardContainer);
