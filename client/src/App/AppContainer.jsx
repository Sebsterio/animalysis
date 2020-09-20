import React from "react";
import { connect } from "react-redux";

import {
	getIsLoading,
	getIsAuthenticated,
	getIsVet,
	getIsSuperuser,
	getIsDemo,
} from "redux/user/user-selectors";
import { syncData } from "redux/user/user-operations";
import { clearError } from "redux/error/error-actions";
import { getIsError } from "redux/error/error-selectors";

import { App } from "./App";

const mapStateToProps = (state) => ({
	loading: getIsLoading(state),
	authenticated: getIsAuthenticated(state),
	isVet: getIsVet(state),
	isSuperuser: getIsSuperuser(state),
	isDemo: getIsDemo(state),
	isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
	syncData: () => dispatch(syncData()),
	clearError: () => dispatch(clearError()),
});

const AppContainer = (props) => <App {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
