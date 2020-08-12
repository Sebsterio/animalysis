import React from "react";
import { connect } from "react-redux";

import { getAlertModalLevel } from "redux/survey/survey-selectors";
import { closeAlertModal } from "redux/survey/survey-actions";

import AlertModal from "./AlertModal";

const mapStateToProps = (state) => ({
	level: getAlertModalLevel(state),
});

const mapDispatchToProps = (dispatch) => ({
	closeModal: (data) => dispatch(closeAlertModal(data)),
});

const AlertModalContainer = (props) => <AlertModal {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlertModalContainer);
