import React from "react";
import { connect } from "react-redux";

import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { initSurvey } from "redux/survey/survey-operations";

import Home from "./Home";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
	initSurvey: (data) => dispatch(initSurvey(data)),
});

const HomeContainer = (props) => <Home {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
