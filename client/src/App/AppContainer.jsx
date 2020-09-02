import React from "react";
import { connect } from "react-redux";

import {
	getIsLoading,
	getIsAuthenticated,
	getIsVet,
} from "redux/user/user-selectors";
import { syncData } from "redux/session/session-operations";

import { App } from "./App";

const mapStateToProps = (state) => ({
	loading: getIsLoading(state),
	authenticated: getIsAuthenticated(state),
	isVet: getIsVet(state),
});

const mapDispatchToProps = (dispatch) => ({
	syncData: () => dispatch(syncData()),
});

const AppContainer = (props) => <App {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
