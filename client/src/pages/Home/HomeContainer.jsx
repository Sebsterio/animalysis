import React from "react";
import { connect } from "react-redux";
import { getName } from "redux/user/user-selectors";

import { Home } from "./Home";

const mapStateToProps = (state) => ({
	username: getName(state),
});

const mapDispatchToProps = (dispatch) => ({});

const HomeContainer = (props) => <Home {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
