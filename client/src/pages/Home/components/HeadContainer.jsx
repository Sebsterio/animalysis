import React from "react";
import { connect } from "react-redux";
import {
	getName,
	getShouldShowClinicReminder,
	getShouldShowUserReminder,
} from "redux/user/user-selectors";
import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { clearSurvey } from "redux/survey/survey-actions";
import {
	dismissClinicReminder,
	dismissUserReminder,
} from "redux/user/user-actions";

import { Head } from "./Head";

const mapStateToProps = (state) => ({
	username: getName(state),
	surveyIsLoaded: getIsSurveyLoaded(state),
	clinicReminderOn: getShouldShowClinicReminder(state),
	userReminderOn: getShouldShowUserReminder(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearSurvey: () => dispatch(clearSurvey()),
	dismissClinicReminder: () => dispatch(dismissClinicReminder()),
	dismissUserReminder: () => dispatch(dismissUserReminder()),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);
