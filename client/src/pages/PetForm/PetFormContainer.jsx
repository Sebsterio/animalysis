import React from "react";
import { connect } from "react-redux";
import {
	getPetByName,
	isNameUnique,
	getIsUpdating,
} from "redux/pets/pets-selectors";
import { addPet, modifyPet, deletePet } from "redux/pets/pets-operations";
import { PetForm } from "./PetForm";

const mapStateToProps = (state) => ({
	getPet: (name) => getPetByName(state, name),
	isNameUnique: (name) => isNameUnique(state, name),
	updating: getIsUpdating(state),
});

const mapDispatchToProps = (dispatch) => ({
	addPet: (data) => dispatch(addPet(data)),
	modifyPet: (id, data) => dispatch(modifyPet(id, data)),
	deletePet: (data) => dispatch(deletePet(data)),
});

const PetFormContainer = (props) => <PetForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(PetFormContainer);
