import React from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "redux/user/user-selectors";

import { App } from "./App";

const mapStateToProps = (state) => ({
	isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({});

const AppContainer = (props) => <App {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
