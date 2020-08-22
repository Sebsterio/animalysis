import React from "react";
import { connect } from "react-redux";
import {
	getName,
	getShouldShowClinicReminder,
} from "redux/user/user-selectors";
import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { clearSurvey } from "redux/survey/survey-actions";
import { dismissClinicReminder } from "redux/user/user-actions";

import { Head } from "./Head";

const mapStateToProps = (state) => ({
	username: getName(state),
	surveyIsLoaded: getIsSurveyLoaded(state),
	clinicReminderOn: getShouldShowClinicReminder(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearSurvey: () => dispatch(clearSurvey()),
	dismissClinicReminder: () => dispatch(dismissClinicReminder()),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);
