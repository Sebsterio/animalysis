import React from "react";
import { connect } from "react-redux";
import { getPetByName, getPetReports } from "redux/pets/pets-selectors";
// import { syncReports } from "redux/pets/pets-operations";
import { convertPet } from "redux/pets/pets-utils";
import { Pet } from "./Pet";

const mapStateToProps = (state) => ({
	getPetByName: (name) => convertPet(getPetByName(state, name)),
	getReports: (pet) => getPetReports(pet),
});

// const mapDispatchToProps = (dispatch) => ({
// 	syncReports: (data) => dispatch(syncReports(data)),
// });

const PetContainer = (props) => <Pet {...props} />;

export default connect(mapStateToProps /*, mapDispatchToProps */)(PetContainer);
