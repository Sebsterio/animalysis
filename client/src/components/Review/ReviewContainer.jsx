import React from "react";
import { connect } from "react-redux";

import { getSequences } from "redux/survey/survey-selectors";

import Review from "./Review";

const mapStateToProps = (state) => ({
	sequences: getSequences(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SurveyContainer = (props) => <Review {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
