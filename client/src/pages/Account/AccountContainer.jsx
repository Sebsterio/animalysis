import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "redux/user/user-selectors";

import { signIn, signUp } from "redux/user/user-operations";

import Account from "./Account";

const mapStateToProps = (state) => ({
	isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (data) => dispatch(signIn(data)),
	signUp: (data) => dispatch(signUp(data)),
});

const AccountContainer = (props) => <Account {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
