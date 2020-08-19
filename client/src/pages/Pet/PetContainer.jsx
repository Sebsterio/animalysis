import React from "react";
import { connect } from "react-redux";
import { getPetByName, getPetReports } from "redux/pets/pets-selectors";
import { convertPet } from "redux/pets/pets-utils";
import { Pet } from "./Pet";

const mapStateToProps = (state) => ({
	getPetByName: (name) => convertPet(getPetByName(state, name)),
	getReports: (pet) => getPetReports(pet),
});

const PetContainer = (props) => <Pet {...props} />;

export default connect(mapStateToProps, null)(PetContainer);
