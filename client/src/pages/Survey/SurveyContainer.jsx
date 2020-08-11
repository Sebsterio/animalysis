import React from "react";
import { connect } from "react-redux";

import { getIsSurveyLoaded } from "redux/survey/survey-selectors";

import { Survey } from "./Survey";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
});

const SurveyContainer = (props) => <Survey {...props} />;

export default connect(mapStateToProps)(SurveyContainer);
