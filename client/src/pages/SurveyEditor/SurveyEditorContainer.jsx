import React from "react";
import { connect } from "react-redux";
import { setSurveyData } from "redux/survey-data/survey-data-actions";
import { publishSurvey } from "redux/survey-data/survey-data-operations";
import { clear } from "redux/survey/survey-actions";
import { getIsAdmin } from "redux/clinic/clinic-selectors";
import { getIsDemo } from "redux/user/user-selectors";

import { SurveyEditor } from "./SurveyEditor";

const mapStateToProps = (state) => ({
	data: state.surveyData,
	isAdmin: getIsAdmin(state),
	isDemo: getIsDemo(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateStore: (data) => dispatch(setSurveyData(data)),
	updateDatabase: () => dispatch(publishSurvey()),
	clearPreview: () => dispatch(clear()),
});

const SurveyEditorContainer = (props) => <SurveyEditor {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyEditorContainer);
