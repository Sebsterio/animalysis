import React from "react";
import { connect } from "react-redux";

import { getIsAlertModalActive } from "redux/survey/survey-selectors";
import { deactivateAlertModal } from "redux/survey/survey-actions";
import { endSurvey, callClinic } from "redux/survey/survey-operations";

import AlertModal from "./AlertModal";

const mapStateToProps = (state) => ({
	isActive: getIsAlertModalActive(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	closeModal: () => dispatch(deactivateAlertModal()),
	endSurvey: () => dispatch(endSurvey(props.history)),
	callClinic: () => dispatch(callClinic()),
});

const AlertModalContainer = (props) => <AlertModal {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlertModalContainer);
