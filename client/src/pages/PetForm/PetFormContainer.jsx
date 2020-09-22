import React from "react";
import { connect } from "react-redux";
import {
	getPetByName,
	isNameUnique,
	getIsUpdating,
} from "redux/pets/pets-selectors";
import { addPet, modifyPet, deletePet } from "redux/pets/pets-operations";
import { PetForm } from "./PetForm";
import { getIsDemo } from "redux/user/user-selectors";

const mapStateToProps = (state) => ({
	getPet: (name) => getPetByName(state, name),
	isNameUnique: (name) => isNameUnique(state, name),
	updating: getIsUpdating(state),
	isDemo: getIsDemo(state),
});

const mapDispatchToProps = (dispatch) => ({
	addPet: (data) => dispatch(addPet(data)),
	modifyPet: (data) => dispatch(modifyPet(data)),
	deletePet: (data) => dispatch(deletePet(data)),
});

const PetFormContainer = (props) => <PetForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(PetFormContainer);
