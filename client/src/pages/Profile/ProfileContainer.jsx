import React from "react";
import { connect } from "react-redux";

import {
	getIsSurveyLoaded,
	isPetIdActive,
} from "redux/survey/survey-selectors";
import {
	startRoutineCheck,
	startProblemReport,
} from "redux/survey/survey-operations";

import { Profile } from "./Profile";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
	isPetIdActive: (id) => isPetIdActive(state, id),
});

const mapDispatchToProps = (dispatch) => ({
	startRoutineCheck: (data) => dispatch(startRoutineCheck(data)),
	startProblemReport: (data) => dispatch(startProblemReport(data)),
});

const ProfileContainer = (props) => <Profile {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
