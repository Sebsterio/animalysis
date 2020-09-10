import React from "react";
import { connect } from "react-redux";
import {
	getPetByName,
	getPetById,
	getPetReports,
} from "redux/pets/pets-selectors";
import { getIsVet } from "redux/user/user-selectors";
import { convertPet } from "redux/pets/pets-utils";
import { Pet } from "./Pet";

const mapStateToProps = (state) => ({
	getPetByName: (name) => convertPet(getPetByName(state, name)),
	getPetById: (id) => convertPet(getPetById(state, id)),
	getReports: (pet) => getPetReports(pet),
	isVet: getIsVet(state),
});

const PetContainer = (props) => <Pet {...props} />;

export default connect(mapStateToProps)(PetContainer);
