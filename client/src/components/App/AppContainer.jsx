import React from "react";
import { connect } from "react-redux";

import App from "./App";

const mapStateToProps = (state) => ({
	isAuthenticated: true,
});

const mapDispatchToProps = (dispatch) => ({});

const AppContainer = (props) => <App {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
