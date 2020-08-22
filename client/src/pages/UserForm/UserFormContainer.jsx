import React from "react";
import { connect } from "react-redux";
import { getUserInfo } from "redux/user/user-selectors";
import { modifyUserInfo } from "redux/user/user-actions";

import { UserForm } from "./UserForm";

const mapStateToProps = (state) => ({
	currentUser: getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateUser: (data) => dispatch(modifyUserInfo(data)),
});

const UserFormContainer = (props) => <UserForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer);
