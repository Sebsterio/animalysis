import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "redux/user/user-selectors";

import {
	signIn,
	signUp,
	signOut,
	updateUser,
	deleteUser,
} from "redux/user/user-operations";

import Account from "./Account";

const mapStateToProps = (state) => ({
	isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (data) => dispatch(signIn(data)),
	signUp: (data) => dispatch(signUp(data)),
	update: (data) => dispatch(updateUser(data)),
	close: (data) => dispatch(deleteUser(data)),
	signOut: () => dispatch(signOut()),
});

const AccountContainer = (props) => <Account {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
