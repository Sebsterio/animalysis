import React from "react";
import { connect } from "react-redux";
import { getReportById, getPetById } from "redux/pets/pets-selectors";
import { deletePet } from "redux/pets/pets-actions";
import { convertPet } from "redux/pets/pets-utils";
import { getIsVet } from "redux/user/user-selectors";
import Report from "./Report";

const mapStateToProps = (state) => ({
	getReport: (id) => getReportById(state, id),
	getPet: (id) => convertPet(getPetById(state, id)),
	isVet: getIsVet(state),
});

const mapDispatchToProps = (dispatch) => ({
	deletePet: (data) => dispatch(deletePet(data)),
});

const ReportContainer = (props) => <Report {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
