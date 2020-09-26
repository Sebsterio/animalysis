import React from "react";
import { connect } from "react-redux";

import {
	getIsAuthenticated,
	getIsUpdating,
	getIsSuperuser,
	getIsDemo,
} from "redux/user/user-selectors";
import { updateUser } from "redux/user/user-operations";
import {
	signIn,
	signUp,
	sendCode,
	resetPassword,
	signOut,
	closeAccount,
} from "redux/user/user-operations";
import { clearError } from "redux/error/error-actions";

import Account from "./Account";

const mapStateToProps = (state) => ({
	authenticated: getIsAuthenticated(state),
	updating: getIsUpdating(state),
	superuser: getIsSuperuser(state),
	isDemo: getIsDemo(state),
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (data) => dispatch(signIn(data)),
	signUp: (data) => dispatch(signUp(data)),
	sendCode: (data) => dispatch(sendCode(data)),
	resetPassword: (data) => dispatch(resetPassword(data)),
	update: (data) => dispatch(updateUser(data)),
	close: (data) => dispatch(closeAccount(data)),
	signOut: () => dispatch(signOut()),
	clearError: () => dispatch(clearError()),
});

const AccountContainer = (props) => <Account {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
