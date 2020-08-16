import React from "react";
import { connect } from "react-redux";
import { getName } from "redux/user/user-selectors";
import { getIsSurveyLoaded } from "redux/survey/survey-selectors";
import { clearSurvey } from "redux/survey/survey-actions";

import { Head } from "./Head";

const mapStateToProps = (state) => ({
	surveyIsLoaded: getIsSurveyLoaded(state),
	username: getName(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearSurvey: () => dispatch(clearSurvey()),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);
