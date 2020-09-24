import React from "react";
import { connect } from "react-redux";

import { getName } from "redux/profile/profile-selectors";

import { SuDashboard } from "./SuDashboard";

// --------------------------------------------------------------

const mapStateToProps = (state) => ({
	username: getName(state),
});

const SuDashboardContainer = (props) => <SuDashboard {...props} />;

export default connect(mapStateToProps)(SuDashboardContainer);
