import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "redux/user/user-selectors";

import Account from "./Account";

const mapStateToProps = (state) => ({
	isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
	// clearError: () => dispatch(clearError()),
	// register: (data) => dispatch(register(data)),
	// login: (data) => dispatch(login(data)),
	// logout: () => dispatch(logout()),
	// remove: (data) => dispatch(closeAccount(data)),
});

const AccountContainer = (props) => <Account {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
