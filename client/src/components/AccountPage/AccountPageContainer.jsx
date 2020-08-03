import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "redux/user/user-selectors";

import AccountPage from "./AccountPage";

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

const AccountPageContainer = (props) => <AccountPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPageContainer);
