import React from "react";
import { connect } from "react-redux";

import { getIsAlertModalActive } from "redux/survey/survey-selectors";
import { deactivateAlertModal } from "redux/survey/survey-actions";
import { endSurvey } from "redux/survey/survey-operations";
import { getClinicPhone } from "redux/clinic/clinic-selectors";

import AlertModal from "./AlertModal";

const mapStateToProps = (state) => ({
	isActive: getIsAlertModalActive(state),
	phone: getClinicPhone(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	closeModal: () => dispatch(deactivateAlertModal()),
	endSurvey: () => dispatch(endSurvey(props.history, () => {})),
});

const AlertModalContainer = (props) => <AlertModal {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlertModalContainer);
