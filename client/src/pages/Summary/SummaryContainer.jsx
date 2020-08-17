import React from "react";
import { connect } from "react-redux";

import {
	getPetId,
	getMaxAlertFromHistory,
	getIsOptionalQueuePopulated,
} from "redux/survey/survey-selectors";
import { getPetById } from "redux/pets/pets-selectors";
import {
	initOptionalSurvey,
	endSurvey,
	callClinic,
} from "redux/survey/survey-operations";

import Summary from "./Summary";

const mapStateToProps = (state) => ({
	pet: getPetById(state, getPetId(state)),
	alertLevel: getMaxAlertFromHistory(state),
	optionalQueueExists: getIsOptionalQueuePopulated(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	continueSurvey: () => dispatch(initOptionalSurvey(props.history)),
	endSurvey: () => dispatch(endSurvey(props.history)),
	callClinic: () => dispatch(callClinic()),
});

const SummaryContainer = (props) => <Summary {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer);
