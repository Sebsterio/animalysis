import React from "react";
import { connect } from "react-redux";

import {
	startRoutineCheck,
	startProblemReport,
	endPreview,
} from "redux/survey/survey-operations";
import { getPetById } from "redux/pets/pets-selectors";
import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { addDemoPet } from "redux/pets/pets-operations";
import { modifyPet } from "redux/pets/pets-actions";

import { VetSurvey } from "./VetSurvey";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
	demoPet: getPetById(state, "demo-pet"),
});

const mapDispatchToProps = (dispatch, props) => ({
	startRoutineCheck: (data) => dispatch(startRoutineCheck(data, props.history)),
	startProblemReport: (data) =>
		dispatch(startProblemReport(data, props.history)),
	addDemoPet: () => dispatch(addDemoPet()),
	modifyPet: (data) => dispatch(modifyPet(data)),
	endPreview: () => dispatch(endPreview()),
});

const VetSurveyContainer = (props) => <VetSurvey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(VetSurveyContainer);
