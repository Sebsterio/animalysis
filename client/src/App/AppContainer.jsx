import React from "react";
import { connect } from "react-redux";

import { getIsLoading, getIsAuthenticated } from "redux/user/user-selectors";
import { syncUser } from "redux/user/user-operations";

import { App } from "./App";

const mapStateToProps = (state) => ({
	loading: getIsLoading(state),
	authenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
	syncUser: () => dispatch(syncUser()),
});

const AppContainer = (props) => <App {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
