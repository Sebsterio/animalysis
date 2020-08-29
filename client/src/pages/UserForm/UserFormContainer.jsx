import React from "react";
import { connect } from "react-redux";

import { getProfile } from "redux/profile/profile-selectors";
import { modifyProfile } from "redux/profile/profile-actions";

import { UserForm } from "./UserForm";

const mapStateToProps = (state) => ({
	currentUser: getProfile(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateUser: (data) => dispatch(modifyProfile(data)),
});

const UserFormContainer = (props) => <UserForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer);
