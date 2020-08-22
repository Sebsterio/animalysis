import React from "react";
import { connect } from "react-redux";
import { getPetByName, isNameUnique } from "redux/pets/pets-selectors";
import { addPet, modifyPet } from "redux/pets/pets-actions";
import { cleanDeletePet } from "redux/pets/pets-operations";
import { PetForm } from "./PetForm";

const mapStateToProps = (state) => ({
	getPet: (name) => getPetByName(state, name),
	isNameUnique: (name) => isNameUnique(state, name),
});

const mapDispatchToProps = (dispatch) => ({
	addPet: (data) => dispatch(addPet(data)),
	modifyPet: (id, data) => dispatch(modifyPet(id, data)),
	deletePet: (data) => dispatch(cleanDeletePet(data)),
});

const PetFormContainer = (props) => <PetForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(PetFormContainer);
