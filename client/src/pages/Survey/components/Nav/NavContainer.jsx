import React from "react";
import { connect } from "react-redux";

import { getIsCurrentQuestionAnswered } from "redux/survey/survey-selectors";

import { Nav } from "./Nav";

const mapStateToProps = (state) => ({
	canGoForward: getIsCurrentQuestionAnswered(state),
});

const NavContainer = (props) => <Nav {...props} />;

export default connect(mapStateToProps, null)(NavContainer);
