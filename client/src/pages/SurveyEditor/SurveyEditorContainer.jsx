import React from "react";
import { connect } from "react-redux";
import { setSurveyData } from "redux/survey-data/survey-data-actions";
import { publishSurvey } from "redux/survey-data/survey-data-operations";
import { clearSurvey } from "redux/survey/survey-actions";
import { getIsAdmin } from "redux/clinic/clinic-selectors";
import { SurveyEditor } from "./SurveyEditor";

const mapStateToProps = (state) => ({
	data: state.surveyData,
	isAdmin: getIsAdmin(state),
});

const mapDispatchToProps = (dispatch) => ({
	updateStore: (data) => dispatch(setSurveyData(data)),
	updateDatabase: () => dispatch(publishSurvey()),
	clearPreview: () => dispatch(clearSurvey()),
});

const SurveyEditorContainer = (props) => <SurveyEditor {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyEditorContainer);
