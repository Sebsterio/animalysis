import React from "react";
import { connect } from "react-redux";

import {
	getPetId,
	getMaxAlertFromHistory,
	getIsOptionalQueuePopulated,
} from "redux/survey/survey-selectors";
import { initOptionalSurvey, endSurvey } from "redux/survey/survey-operations";
import { getPetById } from "redux/pets/pets-selectors";
import { getClinicPhone } from "redux/clinic/clinic-selectors";

import Summary from "./Summary";

const mapStateToProps = (state) => ({
	pet: getPetById(state, getPetId(state)),
	alertLevel: getMaxAlertFromHistory(state),
	optionalQueueExists: getIsOptionalQueuePopulated(state),
	phone: getClinicPhone(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	continueSurvey: () => dispatch(initOptionalSurvey(props.history)),
	endSurvey: () => dispatch(endSurvey(props.history)),
});

const SummaryContainer = (props) => <Summary {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer);
