import React from "react";
import { connect } from "react-redux";
import { getPetByName } from "redux/pets/pets-selectors";
import { addPet, modifyPet } from "redux/pets/pets-actions";
import { AddOrEditProfile } from "./AddOrEditProfile";

const mapStateToProps = (state) => ({
	getPet: (name) => getPetByName(state, name),
});

const mapDispatchToProps = (dispatch) => ({
	addPet: (data) => dispatch(addPet(data)),
	modifyPet: (data) => dispatch(modifyPet(data)),
});

const AddOrEditProfileContainer = (props) => <AddOrEditProfile {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddOrEditProfileContainer);
