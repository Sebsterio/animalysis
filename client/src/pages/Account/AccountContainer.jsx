import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "redux/user/user-selectors";

import { signIn } from "redux/user/user-actions";

import Account from "./Account";

const mapStateToProps = (state) => ({
	isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signIn()),
});

const AccountContainer = (props) => <Account {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
