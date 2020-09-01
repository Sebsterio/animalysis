import React from "react";
import { connect } from "react-redux";

import { getData } from "redux/profile/profile-selectors";
import { updateProfile } from "redux/profile/profile-operations";

import { ProfileForm } from "./ProfileForm";

const mapStateToProps = (state) => ({
	currentProfile: getData(state),
});

const mapDispatchToProps = (dispatch) => ({
	update: (data) => dispatch(updateProfile(data)),
});

const ProfileFormContainer = (props) => <ProfileForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileFormContainer);
