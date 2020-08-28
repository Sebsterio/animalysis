import React from "react";
import { connect } from "react-redux";
import { setSurveyData } from "redux/survey-data/survey-data-actions";
import { SurveyEditor } from "./SurveyEditor";

const mapStateToProps = (state) => ({
	data: state.SurveyEditor,
});

const mapDispatchToProps = (dispatch) => ({
	submit: (data) => dispatch(setSurveyData(data)),
});

const SurveyEditorContainer = (props) => <SurveyEditor {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyEditorContainer);
