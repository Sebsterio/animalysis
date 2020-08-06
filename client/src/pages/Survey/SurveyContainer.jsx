import React from "react";
import { connect } from "react-redux";

import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { goForward, goBack } from "redux/survey/survey-operations";

import { Survey } from "./Survey";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
	goForward: (data) => dispatch(goForward(data)),
	goBack: (data) => dispatch(goBack(data)),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
