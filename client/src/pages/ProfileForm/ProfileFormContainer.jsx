import React from "react";
import { connect } from "react-redux";

import { getProfile } from "redux/profile/profile-selectors";
import { updateProfile } from "redux/profile/profile-operations";

import { ProfileForm } from "./ProfileForm";

const mapStateToProps = (state) => ({
	currentProfile: getProfile(state),
});

const mapDispatchToProps = (dispatch) => ({
	update: (data) => dispatch(updateProfile(data)),
});

const ProfileFormContainer = (props) => <ProfileForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileFormContainer);
