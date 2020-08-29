import React from "react";
import { connect } from "react-redux";
import { setSurveyData } from "redux/survey-data/survey-data-actions";
import { publishSurvey } from "redux/survey-data/survey-data-operations";
import { SurveyEditor } from "./SurveyEditor";

const mapStateToProps = (state) => ({
	data: state.surveyData,
});

const mapDispatchToProps = (dispatch) => ({
	updateStore: (data) => dispatch(setSurveyData(data)),
	updateDatabase: () => dispatch(publishSurvey()),
});

const SurveyEditorContainer = (props) => <SurveyEditor {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyEditorContainer);
