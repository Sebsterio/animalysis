import React from "react";
import { connect } from "react-redux";

import { getHistory, getSurveyData } from "redux/survey/survey-selectors";

import Review from "./Review";

const mapStateToProps = (state) => ({
	history: getHistory(state),
	data: getSurveyData(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SurveyContainer = (props) => <Review {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
