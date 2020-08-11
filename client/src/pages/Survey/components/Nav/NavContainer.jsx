import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getIsCurrentQuestionAnswered,
} from "redux/survey/survey-selectors";
import { handleGoBack, handleGoForward } from "redux/survey/survey-operations";

import { Nav } from "./Nav";

const mapStateToProps = (state) => ({
	currentQuestion: getCurrentQuestionData(state),
	questionIsAnswered: getIsCurrentQuestionAnswered(state),
});

const mapDispatchToProps = (dispatch) => ({
	handleGoBack: (data) => dispatch(handleGoBack(data)),
	handleGoForward: (data) => dispatch(handleGoForward(data)),
});

const NavContainer = (props) => <Nav {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
