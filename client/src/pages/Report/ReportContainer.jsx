import React from "react";
import { connect } from "react-redux";
import { getReportById, getPetById } from "redux/pets/pets-selectors";
import { resendReport } from "redux/pets/pets-operations";
import { convertPet } from "redux/pets/pets-utils";
import { getIsVet } from "redux/user/user-selectors";
import Report from "./Report";

const mapStateToProps = (state) => ({
	getReport: (id) => getReportById(state, id),
	getPet: (id) => convertPet(getPetById(state, id)),
	isVet: getIsVet(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	resendReport: (data) => dispatch(resendReport(data)),
});

const ReportContainer = (props) => <Report {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
