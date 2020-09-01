import React from "react";
import { connect } from "react-redux";

// Profile redux
import {
	getName,
	getShouldShowProfileReminder,
	getIsLoading,
} from "redux/profile/profile-selectors";
import { dismissProfileReminder } from "redux/profile/profile-actions";

// Clinic redux
import { getShouldShowClinicReminder } from "redux/clinic/clinic-selectors";
import { dismissClinicReminder } from "redux/clinic/clinic-actions";

// Survey redux
import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { clearSurvey } from "redux/survey/survey-actions";

// Child component
import { Head } from "./Head";

// --------------------------------------------------------------

const mapStateToProps = (state) => ({
	username: getName(state),
	profileLoading: getIsLoading(state),
	surveyIsLoaded: getIsSurveyLoaded(state),
	clinicReminderOn: getShouldShowClinicReminder(state),
	profileReminderOn: getShouldShowProfileReminder(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearSurvey: () => dispatch(clearSurvey()),
	dismissClinicReminder: () => dispatch(dismissClinicReminder()),
	dismissProfileReminder: () => dispatch(dismissProfileReminder()),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);
