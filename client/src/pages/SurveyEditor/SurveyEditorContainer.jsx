import React from "react";
import { connect } from "react-redux";
import { SurveyEditor } from "./SurveyEditor";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const SurveyEditorContainer = (props) => <SurveyEditor {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveyEditorContainer);
