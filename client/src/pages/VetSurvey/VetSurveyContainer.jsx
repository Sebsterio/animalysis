import React from "react";
import { connect } from "react-redux";

import {
	startRoutineCheck,
	startProblemReport,
} from "redux/survey/survey-operations";
import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { getFirstPet, getIsPetsListEmpty } from "redux/pets/pets-selectors";
import { addDemoPet } from "redux/pets/pets-operations";
import { modifyPet } from "redux/pets/pets-actions";

import { VetSurvey } from "./VetSurvey";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
	currentPet: getFirstPet(state),
	noPets: getIsPetsListEmpty(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	startRoutineCheck: (data) => dispatch(startRoutineCheck(data, props.history)),
	startProblemReport: (data) =>
		dispatch(startProblemReport(data, props.history)),
	addDemoPet: () => dispatch(addDemoPet()),
	modifyPet: (data) => dispatch(modifyPet(data)),
});

const VetSurveyContainer = (props) => <VetSurvey {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(VetSurveyContainer);
