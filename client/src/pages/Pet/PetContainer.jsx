import React from "react";
import { connect } from "react-redux";

import { getPetByName, getPetReports } from "redux/pets/pets-selectors";

import { Pet } from "./Pet";

const mapStateToProps = (state) => ({
	getPetByName: (name) => getPetByName(state, name),
	getReports: (pet) => getPetReports(pet),
});

const PetContainer = (props) => <Pet {...props} />;

export default connect(mapStateToProps, null)(PetContainer);
