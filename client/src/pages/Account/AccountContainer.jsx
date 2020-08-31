import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated, getIsUpdating } from "redux/user/user-selectors";
import {
	signIn,
	signUp,
	signOut,
	updateUser,
	deleteUser,
} from "redux/user/user-operations";
import { clearError } from "redux/error/error-actions";

import Account from "./Account";

const mapStateToProps = (state) => ({
	authenticated: getIsAuthenticated(state),
	updating: getIsUpdating(state),
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (data) => dispatch(signIn(data)),
	signUp: (data) => dispatch(signUp(data)),
	update: (data) => dispatch(updateUser(data)),
	close: (data) => dispatch(deleteUser(data)),
	signOut: () => dispatch(signOut()),
	clearError: () => dispatch(clearError()),
});

const AccountContainer = (props) => <Account {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
