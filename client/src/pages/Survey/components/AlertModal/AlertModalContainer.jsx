import React from "react";
import { connect } from "react-redux";

import { getIsAlertModalActive } from "redux/survey/survey-selectors";
import { deactivateAlertModal } from "redux/survey/survey-actions";

import AlertModal from "./AlertModal";

const mapStateToProps = (state) => ({
	active: getIsAlertModalActive(state),
});

const mapDispatchToProps = (dispatch) => ({
	closeModal: () => dispatch(deactivateAlertModal()),
});

const AlertModalContainer = (props) => <AlertModal {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlertModalContainer);
